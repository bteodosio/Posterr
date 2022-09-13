import mongoose from 'mongoose'
import log4js from 'log4js'
import { IDatabase } from '../IDatabase'

export class MongoDB implements IDatabase {
  private readonly logger: log4js.Logger
  public constructor () {
    this.logger = log4js.getLogger()
    this.logger.level = process.env.LOGGER_LEVEL ?? 'info'
  }

  public connect (): void {
    const { DB_ROOT_USER, DB_ROOT_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env
    mongoose.connect(
      `mongodb://${DB_ROOT_USER ?? ''}:${DB_ROOT_PASSWORD ?? ''}@${DB_HOST ?? ''}:${DB_PORT ?? ''}/${DB_NAME ?? ''}?authSource=admin`
    ).then(() => {
      this.logger.debug('Database connected')
    }).catch((failure: string) => {
      this.logger.error(`Fail to connect to database: ${failure}`)
    })
  }
}

export default new MongoDB()
