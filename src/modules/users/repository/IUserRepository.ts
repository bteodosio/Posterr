import { IUser } from '@modules/users/schemas/Users'

export interface IUserRepository{

  getUserByUserName: (userName: string) => Promise<IUser>
}
