import { PostsRepositoryImpl } from '@modules/posts/repository/impl/PostsRepositoryImpl'
import { IPostsRepository } from '@modules/posts/repository/IPostsRepository'
import { ICreatePost } from '@modules/posts/service/ICreatePost'
import { IGetPost } from '@modules/posts/service/IGetPost'
import { CreatePostService } from '@modules/posts/service/impl/CreatePostService'
import { GetPostService } from '@modules/posts/service/impl/GetPostService'
import { UserRepositoryImpl } from '@modules/users/repository/impl/UserRepository'
import { IUserRepository } from '@modules/users/repository/IUserRepository'
import { container } from 'tsyringe'

class InterfaceRegistration {
  public registerInterface (): void {
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
  }
}

export default new InterfaceRegistration()
