export default class PostDTO {
  user: string
  postContent: string
  repostedPost?: string

  constructor (props?: PostDTO) {
    if (props !== null) {
      Object.assign(this, props)
    }
  }
}
