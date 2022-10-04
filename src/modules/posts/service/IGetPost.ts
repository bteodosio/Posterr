import { GetPostsFiltersDTO } from '../dto/GetPostsFiltersDTO'
import { IPosts } from '../schemas/Posts'

export interface IGetPost{
  execute: (getFiltersDTO: GetPostsFiltersDTO) => Promise<IPosts[]>
}
