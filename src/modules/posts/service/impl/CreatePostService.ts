import Users, { IUser } from '@modules/users/schemas/Users'
import Posts, { IPosts } from '../../schemas/Posts'
import { PostsResponseDTO } from '@modules/posts/dto/PostsResponseDTO'
import { PostsRequestDTO } from '@modules/posts/dto/PostsRequestDTO'
import { ErrorHandler } from '@shared/common/ErrorHandler'
import { Types } from 'mongoose'
import { ICreatePost } from '../ICreatePost'

export default class CreatePostService implements ICreatePost {
  private readonly MAX_POST_LIMIT = 5

  public async execute (newPostRequestDTO: PostsRequestDTO): Promise<PostsResponseDTO> {
    const existentUser = await this.getUserByUserName(newPostRequestDTO.userName)

    await this.postLimitValidation(existentUser)

    const newPost = new Posts()
    newPost.user = existentUser._id
    newPost.postContent = newPostRequestDTO.postContent
    if (newPostRequestDTO.postId != null && newPostRequestDTO.postId.trim() !== '') {
      newPost.repostedPost =
      await (await this.getPostToBeReposted(
        newPostRequestDTO.postId ?? '',
        existentUser._id
      ))._id
    }
    await newPost.save()
    return new PostsResponseDTO({ postCreated: newPost })
  }

  private async getUserByUserName (userName: string): Promise<IUser> {
    const existentUser = await Users.findOne({ userName })
    if (existentUser === null) {
      throw new ErrorHandler(400, 'Invalid username', 'Post creation')
    }
    return existentUser
  }

  private async postLimitValidation (user: IUser): Promise<void> {
    const postAlreadyCreated = await Posts.find({ $and: [{ user }, { created_at: new Date() }] })
    if (postAlreadyCreated.length >= this.MAX_POST_LIMIT) {
      throw new ErrorHandler(400, 'Post creation limit reached', 'Post creation')
    }
  }

  private async getPostToBeReposted (postId: string, userId: Types.ObjectId): Promise<IPosts> {
    const existentPost = await Posts.findById(postId)

    if (existentPost == null) {
      throw new ErrorHandler(400, 'Invalid post to be reposted', 'Post creation')
    }

    if (userId.equals(existentPost.user)) {
      throw new ErrorHandler(400, 'User cannot repost their own post', 'Post creation')
    }

    return existentPost
  }
}
