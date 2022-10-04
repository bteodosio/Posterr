import { Request, Response } from 'express'
import { autoInjectable, inject } from 'tsyringe'
import { GetPostsFiltersDTO } from '../dto/GetPostsFiltersDTO'
import { PostsRequestDTO } from '../dto/PostsRequestDTO'
import { ICreatePost } from '../service/ICreatePost'
import { IGetPost } from '../service/IGetPost'

@autoInjectable()
export default class PostController {
  constructor (
    @inject('CreatePostImpl') private readonly createPostService: ICreatePost,
    @inject('GetPostImpl') private readonly getPostService: IGetPost
  ) {}

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
      const postCreationResponse = await this.getPostService.execute(getPostsFiltersDTO)
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
