import log4js from 'log4js'

class Logger {
  public logger: log4js.Logger
  constructor () {
    this.logger = log4js.getLogger()
    this.logger.level = process.env.LOGGER_LEVEL ?? 'info'
  }
}

export default new Logger().logger
