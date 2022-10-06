import { GetPostsFiltersDTO } from '@modules/posts/dto/GetPostsFiltersDTO'
import { IPostsRepository } from '@modules/posts/repository/IPostsRepository'
import { IPosts } from '@modules/posts/schemas/Posts'
import { inject, injectable } from 'tsyringe'
import { IGetPost } from '../IGetPost'

@injectable()
export class GetPostService implements IGetPost {
  private readonly MAX_LIMIT_PER_PAGE = 10
  constructor (@inject('PostsRepo') private readonly postRepository: IPostsRepository) {}

  public async execute (getFiltersDTO: GetPostsFiltersDTO): Promise<IPosts[]> {
    getFiltersDTO.maxReturnPerPage = this.MAX_LIMIT_PER_PAGE
    return await this.postRepository.findPostsByFilters(getFiltersDTO)
  }
}
