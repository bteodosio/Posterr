import { GetPostsFiltersDTO } from '@modules/posts/dto/GetPostsFiltersDTO'
import PostDTO from '@modules/posts/dto/PostDTO'
import Posts, { IPosts } from '@modules/posts/schemas/Posts'
import Users, { IUser } from '@modules/users/schemas/Users'
import { ErrorHandler } from '@shared/common/ErrorHandler'
import { IPostsRepository } from '../IPostsRepository'

export class PostsRepositoryImpl implements IPostsRepository {
  public async savePost (post: PostDTO): Promise<IPosts> {
    const postSchema = new Posts(post)
    return await postSchema.save()
  }

  public async findPostById (postId: string): Promise<IPosts | null> {
    return await Posts.findById(postId)
  }

  public async findPostsByUserAndCreationDate (user: IUser, creationDate: Date): Promise<IPosts[]> {
    return await Posts.find({ $and: [{ user }, { created_at: creationDate }] })
  }

  public async findPostsByFilters (getFiltersDTO: GetPostsFiltersDTO): Promise<IPosts[]> {
    const $and = [{}]

    if (getFiltersDTO.userName != null && getFiltersDTO.userName.trim() !== '') {
      const existentUser = await Users.find({ userName: getFiltersDTO.userName })
      $and.push({ user: existentUser ?? '' })
    }

    if (getFiltersDTO.startDate != null && getFiltersDTO.startDate.trim() !== '') {
      const startDate = new Date(getFiltersDTO.startDate)
      if (startDate.toString() === 'Invalid Date') {
        throw new ErrorHandler(400, 'Invalid start date', 'Get posts')
      }
      $and.push({ createdAt: { $gte: startDate } })
    }

    if (getFiltersDTO.endDate != null && getFiltersDTO.endDate.trim() !== '') {
      const endDate = new Date(getFiltersDTO.endDate)
      if (endDate.toString() === 'Invalid Date') {
        throw new ErrorHandler(400, 'Invalid end date', 'Get posts')
      }
      $and.push({ createdAt: { $lte: endDate.setUTCHours(23, 59, 59, 999) } })
    }

    return await Posts
      .find({ $and })
      .skip(((getFiltersDTO.page ?? 1) - 1) * (getFiltersDTO.maxReturnPerPage ?? 5))
      .limit(getFiltersDTO.maxReturnPerPage ?? 5)
      .populate({
        path: 'user'
      })
      .populate({
        path: 'repostedPost',
        populate: {
          path: 'user repostedPost'
        }
      })
  }
}
