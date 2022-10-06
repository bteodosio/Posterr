import { IUser } from '@modules/users/schemas/Users'
import { GetPostsFiltersDTO } from '../dto/GetPostsFiltersDTO'
import PostDTO from '../dto/PostDTO'
import { IPosts } from '../schemas/Posts'

export interface IPostsRepository{
  savePost: (post: PostDTO) => Promise<IPosts>
  findPostsByFilters: (getFiltersDTO: GetPostsFiltersDTO) => Promise<IPosts[]>
  findPostsByUserAndCreationDate: (user: IUser, creationDate: Date) => Promise<IPosts[]>
  findPostById: (postId: string) => Promise<IPosts | null>
}
