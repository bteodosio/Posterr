export class GetPostsFiltersDTO {
  userName?: string
  startDate?: string
  endDate?: string
  page?: number

  constructor (props?: GetPostsFiltersDTO) {
    if (props !== null) {
      Object.assign(this, props)
    }
  }
}
