import { PostsRequestDTO } from '../dto/PostsRequestDTO'
import { PostsResponseDTO } from '../dto/PostsResponseDTO'

export interface IService{
  execute: (postsRequestDTO: PostsRequestDTO) => Promise<PostsResponseDTO>
}
