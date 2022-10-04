import { PostsRequestDTO } from '../dto/PostsRequestDTO'
import { PostsResponseDTO } from '../dto/PostsResponseDTO'

export interface ICreatePost{
  execute: (postsRequestDTO: PostsRequestDTO) => Promise<PostsResponseDTO>
}
