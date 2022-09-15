export class PostsRequestDTO {
  userName: string
  postContent: string
  postId?: string

  constructor (props?: PostsRequestDTO) {
    if (props !== null) {
      Object.assign(this, props)
    }
  }
}
