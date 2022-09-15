import { IDatabase } from '@infra/config/database/IDatabase'
import mongoose from 'mongoose'
import logger from '@infra/config/log/Logger'

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
}

export default new MongoMock()
