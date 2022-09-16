import { Request, Response } from 'express'
import { autoInjectable } from 'tsyringe'
import { GetPostsFiltersDTO } from '../dto/GetPostsFiltersDTO'
import { PostsRequestDTO } from '../dto/PostsRequestDTO'
import CreatePostService from '../service/impl/CreatePostService'
import GetPostService from '../service/impl/GetPostService'

@autoInjectable()
export default class PostController {
  private readonly createPostService: CreatePostService
  private readonly getPostService: GetPostService

  constructor (createPostServiceImpl: CreatePostService, getPostServiceImpl: GetPostService) {
    this.createPostService = createPostServiceImpl
    this.getPostService = getPostServiceImpl
  }

  public async create (req: Request, res: Response): Promise<Response> {
    try {
      const postCreationResponse = await this.createPostService.execute(new PostsRequestDTO(req.body))
      res.status(201)
      return res.json(postCreationResponse)
    } catch (ex: any) {
      res.statusCode = ex.statusCode ?? 500
      return res.json({
        statusCode: ex.statusCode,
        code: ex.statusCode,
        message: 'Wrong request',
        description: ex.message
      }
      )
    }
  }

  public async getPostByUserName (req: Request, res: Response): Promise<Response> {
    try {
      const getPostsFiltersDTO = new GetPostsFiltersDTO({
        userName: req.query.userName?.toString(),
        startDate: req.query.startDate?.toString(),
        endDate: req.query.endDate?.toString(),
        page: parseInt(req.query.page?.toString() ?? '1')
      })
      const postCreationResponse = await this.getPostService.findPostByFilters(getPostsFiltersDTO)
      return res.json(postCreationResponse)
    } catch (ex: any) {
      res.statusCode = ex.statusCode ?? 500
      return res.json({
        statusCode: ex.statusCode,
        code: ex.statusCode,
        message: 'Wrong request',
        description: ex.message
      }
      )
    }
  }
}
