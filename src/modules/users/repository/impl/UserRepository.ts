import Users, { IUser } from '@modules/users/schemas/Users'
import { ErrorHandler } from '@shared/common/ErrorHandler'
import { IUserRepository } from '../IUserRepository'

export class UserRepositoryImpl implements IUserRepository {
  public async getUserByUserName (userName: string): Promise<IUser> {
    const existentUser = await Users.findOne({ userName })
    if (existentUser === null) {
      throw new ErrorHandler(400, 'Invalid username', 'Post creation')
    }
    return existentUser
  }
}
