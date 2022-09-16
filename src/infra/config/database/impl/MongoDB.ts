import mongoose from 'mongoose'
import logger from '@infra/config/log/Logger'
import { IDatabase } from '../IDatabase'
import { MongoMemoryServer } from 'mongodb-memory-server'
import Users from '@modules/users/schemas/Users'
import Posts from '@modules/posts/schemas/Posts'

export class MongoDB implements IDatabase {
  public connect (): void {
    if (process.env.NODE_ENV === 'DEV') {
      this.devMongoConnection()
    } else {
      this.prodMongoConnection()
    }
  }

  public disconnect: () => void

  private prodMongoConnection (): void {
    const { DB_ROOT_USER, DB_ROOT_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env
    logger.debug('Entering in Prod Database connection')
    this.mongoConnect(`mongodb://${DB_ROOT_USER ?? ''}:${DB_ROOT_PASSWORD ?? ''}@${DB_HOST ?? ''}:${DB_PORT ?? ''}/${DB_NAME ?? ''}?authSource=admin`)
  }

  private devMongoConnection (): void {
    logger.debug('Entering in Dev Database connection')
    let mongoMemoryServer: MongoMemoryServer
    MongoMemoryServer.create()
      .then((mongoServer: MongoMemoryServer) => {
        logger.debug('Mongo memory server created')
        mongoMemoryServer = mongoServer
        this.mongoConnect(mongoMemoryServer.getUri())
      }).catch((failure: string) => {
        logger.error(`Fail to create mongo memory server: ${failure}`)
      })
  }

  private mongoConnect (mongoURL: string): void {
    mongoose.connect(
      mongoURL
    ).then(() => {
      logger.debug('Database connected')

      this.loadData()
        .then(() => {
          logger.debug('Initial data loaded')
        })
        .catch((failure: string) => {
          logger.error(`Fail to load initial data: ${failure}`)
        })
    }).catch((failure: string) => {
      logger.error(`Fail to connect to database: ${failure}`)
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

export default new MongoDB()
