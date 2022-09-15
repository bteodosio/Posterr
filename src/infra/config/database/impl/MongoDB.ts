import mongoose from 'mongoose'
import logger from '@infra/config/log/Logger'
import { IDatabase } from '../IDatabase'
import { MongoMemoryServer } from 'mongodb-memory-server'
import Users from '@modules/users/schemas/Users'

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
    mongoose.connect(
      `mongodb://${DB_ROOT_USER ?? ''}:${DB_ROOT_PASSWORD ?? ''}@${DB_HOST ?? ''}:${DB_PORT ?? ''}/${DB_NAME ?? ''}?authSource=admin`
    ).then(() => {
      logger.debug('Database connected')
    }).catch((failure: string) => {
      logger.error(`Fail to connect to database: ${failure}`)
    })
  }

  private devMongoConnection (): void {
    logger.debug('Entering in Dev Database connection')
    let mongoMemoryServer: MongoMemoryServer
    MongoMemoryServer.create()
      .then((mongoServer: MongoMemoryServer) => {
        logger.debug('Mongo memory server created')
        mongoMemoryServer = mongoServer

        mongoose.connect(
          mongoMemoryServer.getUri()
        ).then(() => {
          logger.debug('Database connected')

          this.loadDevData()
            .then(() => {
              logger.debug('Initial data loaded')
            })
            .catch((failure: string) => {
              logger.error(`Fail to load initial data: ${failure}`)
            })
        }).catch((failure: string) => {
          logger.error(`Fail to connect to database: ${failure}`)
        })
      }).catch((failure: string) => {
        logger.error(`Fail to create mongo memory server: ${failure}`)
      })
  }

  private async loadDevData (): Promise<void> {
    const users = [
      { userName: 'dummyUser' },
      { userName: 'otherDummyUser' }
    ]
    await Users.create(users)
  }
}

export default new MongoDB()
