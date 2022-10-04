import { IDatabase } from 'infra/config/database/IDatabase'
import { MongoDB } from '../../infra/config/database/impl/MongoDB'
import { container } from 'tsyringe'
import { IGetPost } from '@modules/posts/service/IGetPost'
import GetPostService from '@modules/posts/service/impl/GetPostService'
import { ICreatePost } from '@modules/posts/service/ICreatePost'
import CreatePostService from '@modules/posts/service/impl/CreatePostService'

container.registerSingleton<IDatabase>(
  'DatabaseImpl',
  MongoDB
)

container.register<IGetPost>(
  'GetPostImpl',
  GetPostService
)

container.register<ICreatePost>(
  'CreatePostImpl',
  CreatePostService
)
