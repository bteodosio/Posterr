import 'reflect-metadata'
import '@shared/container'
import * as dotenv from 'dotenv'
import App from './App'
import { container } from 'tsyringe'
import log4js from 'log4js'

dotenv.config()
const logger = log4js.getLogger()
logger.level = process.env.LOGGER_LEVEL ?? 'info'

const app = container.resolve(App)

const appPort = process.env.APP_PORT === '' ? '3003' : process.env.APP_PORT
app.express.listen(appPort, () => {
  logger.debug(`Posterr is running at port: ${appPort ?? ''}`)
})
