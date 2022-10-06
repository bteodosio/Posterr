import { PostsResponseDTO } from '@modules/posts/dto/PostsResponseDTO'
import { PostsRequestDTO } from '@modules/posts/dto/PostsRequestDTO'
import { ErrorHandler } from '@shared/common/ErrorHandler'
import { Types } from 'mongoose'
import { ICreatePost } from '../ICreatePost'
import { inject, injectable } from 'tsyringe'
import { IUserRepository } from '@modules/users/repository/IUserRepository'
import { IPostsRepository } from '@modules/posts/repository/IPostsRepository'
import { IUser } from '@modules/users/schemas/Users'
import { IPosts } from '@modules/posts/schemas/Posts'
import PostDTO from '@modules/posts/dto/PostDTO'

@injectable()
export class CreatePostService implements ICreatePost {
  private readonly MAX_POST_LIMIT = 5

  constructor (
    @inject('UserRepo') private readonly userRepository: IUserRepository,
    @inject('PostsRepo') private readonly postsRepository: IPostsRepository
  ) {}

  public async execute (newPostRequestDTO: PostsRequestDTO): Promise<PostsResponseDTO> {
    const existentUser = await this.userRepository.getUserByUserName(newPostRequestDTO.userName)

    await this.postLimitValidation(existentUser)

    const newPostDTO = new PostDTO()
    newPostDTO.user = existentUser._id
    newPostDTO.postContent = newPostRequestDTO.postContent
    if (newPostRequestDTO.postId != null && newPostRequestDTO.postId.trim() !== '') {
      newPostDTO.repostedPost =
      await (await this.getPostToBeReposted(
        newPostRequestDTO.postId ?? '',
        existentUser._id
      ))._id
    }
    const newPost = await this.postsRepository.savePost(newPostDTO)
    return new PostsResponseDTO({ postCreated: newPost })
  }

  private async postLimitValidation (user: IUser): Promise<void> {
    const postAlreadyCreated = await this.postsRepository.findPostsByUserAndCreationDate(user, new Date())
    if (postAlreadyCreated.length >= this.MAX_POST_LIMIT) {
      throw new ErrorHandler(400, 'Post creation limit reached', 'Post creation')
    }
  }

  private async getPostToBeReposted (postId: string, userId: Types.ObjectId): Promise<IPosts> {
    const existentPost = await this.postsRepository.findPostById(postId)

    if (existentPost == null) {
      throw new ErrorHandler(400, 'Invalid post to be reposted', 'Post creation')
    }

    if (userId.equals(existentPost.user)) {
      throw new ErrorHandler(400, 'User cannot repost their own post', 'Post creation')
    }

    return existentPost
  }
}
