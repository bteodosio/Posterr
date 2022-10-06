import { IDatabase } from 'infra/config/database/IDatabase'
import { MongoDB } from '../../infra/config/database/impl/MongoDB'
import { container } from 'tsyringe'
import { IGetPost } from '@modules/posts/service/IGetPost'
import { ICreatePost } from '@modules/posts/service/ICreatePost'
import { GetPostService } from '@modules/posts/service/impl/GetPostService'
import { CreatePostService } from '@modules/posts/service/impl/CreatePostService'
import { UserRepositoryImpl } from '@modules/users/repository/impl/UserRepository'
import { IUserRepository } from '@modules/users/repository/IUserRepository'
import { IPostsRepository } from '@modules/posts/repository/IPostsRepository'
import { PostsRepositoryImpl } from '@modules/posts/repository/impl/PostsRepositoryImpl'

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

container.register<IUserRepository>(
  'UserRepo',
  UserRepositoryImpl
)

container.register<IPostsRepository>(
  'PostsRepo',
  PostsRepositoryImpl
)
