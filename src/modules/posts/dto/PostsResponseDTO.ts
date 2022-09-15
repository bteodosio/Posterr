import { IPosts } from '../schemas/Posts'

export class PostsResponseDTO {
  postCreated: IPosts
  constructor (props?: PostsResponseDTO) {
    if (props !== null) {
      Object.assign(this, props)
    }
  }
}
