import PostController from '@modules/posts/controllers/PostController'
import { Request, RequestHandler, Response, Router } from 'express'
import { container } from 'tsyringe'

const routes = Router()

routes.post('/posts', (async (req: Request, res: Response): Promise<Response> => {
  const postController = container.resolve(PostController)
  return await postController.create(req, res)
}) as RequestHandler)

export default routes
