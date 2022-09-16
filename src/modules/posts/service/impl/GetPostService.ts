import { GetPostsFiltersDTO } from '@modules/posts/dto/GetPostsFiltersDTO'
import Posts, { IPosts } from '@modules/posts/schemas/Posts'
import Users from '@modules/users/schemas/Users'
import { ErrorHandler } from '@shared/common/ErrorHandler'

export default class GetPostService {
  private readonly MAX_LIMIT_PER_PAGE = 10
  public async findPostByFilters (getFiltersDTO: GetPostsFiltersDTO): Promise<IPosts[]> {
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
      .skip(((getFiltersDTO.page ?? 1) - 1) * this.MAX_LIMIT_PER_PAGE)
      .limit(this.MAX_LIMIT_PER_PAGE)
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
