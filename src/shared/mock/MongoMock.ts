import { IDatabase } from '@infra/config/database/IDatabase'
import mongoose from 'mongoose'
import logger from '@infra/config/log/Logger'
import Users from '@modules/users/schemas/Users'
import Posts from '@modules/posts/schemas/Posts'

class MongoMock implements IDatabase {
  public connect (): void {
    if (process.env.MONGO_URL === null) {
      throw Error('Mongo DB not initialized')
    }

    mongoose.connect(process.env.MONGO_URL ?? '')
      .then(() => {
        logger.debug('Jest mongo memory server connected')
      })
      .catch(() => {
        logger.debug('Fail to connect Jest mongo memory server')
      })
  }

  public disconnect (): void {
    if (process.env.MONGO_URL === null) {
      throw Error('Mongo DB not initialized')
    }

    mongoose.disconnect()
      .then(() => {
        logger.debug('Jest mongo memory server disconnected')
      })
      .catch(() => {
        logger.debug('Fail to disconnect Jest mongo memory server')
      })
  }

  public async loadData (): Promise<void> {
    const users = [
      { userName: 'dummyUser' },
      { userName: 'otherDummyUser' },
      { userName: 'someDummyUser' },
      { userName: 'oneDummyUser' }
    ]

    const savedUsers = await Users.create(users)

    const posts = [
      {
        user: savedUsers[0]._id,
        postContent: 'This is a valid post'
      },
      {
        user: savedUsers[0]._id,
        postContent: 'This is a valid post'
      },
      {
        user: savedUsers[0]._id,
        postContent: 'This is a valid post'
      },
      {
        user: savedUsers[0]._id,
        postContent: 'This is a valid post'
      },
      {
        user: savedUsers[0]._id,
        postContent: 'This is a valid post'
      },
      {
        user: savedUsers[0]._id,
        postContent: 'This is a valid post'
      },
      {
        user: savedUsers[0]._id,
        postContent: 'This is a valid post'
      },
      {
        user: savedUsers[0]._id,
        postContent: 'This is a valid post'
      },
      {
        user: savedUsers[0]._id,
        postContent: 'This is a valid post'
      },
      {
        user: savedUsers[0]._id,
        postContent: 'This is a valid post'
      },
      {
        user: savedUsers[0]._id,
        postContent: 'This is a valid post'
      },
      {
        user: savedUsers[0]._id,
        postContent: 'This is a valid post',
        createdAt: new Date('2022-09-15')
      },
      {
        user: savedUsers[1]._id,
        postContent: 'This is a valid post',
        createdAt: new Date('2022-09-15')
      },
      {
        user: savedUsers[1]._id,
        postContent: 'This is a valid post',
        createdAt: new Date('2022-09-15')
      },
      {
        user: savedUsers[1]._id,
        postContent: 'This is a valid post',
        createdAt: new Date('2022-09-15')
      }
    ]

    await Posts.create(posts)
  }
}

export default new MongoMock()
