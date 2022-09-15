import { Request, Response } from 'express'
import { autoInjectable } from 'tsyringe'
import { PostsRequestDTO } from '../dto/PostsRequestDTO'
import CreatePostService from '../service/impl/CreatePostService'

@autoInjectable()
export default class PostController {
  private readonly createPostService: CreatePostService

  constructor (createPostServiceImpl: CreatePostService) {
    this.createPostService = createPostServiceImpl
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
}
