import 'reflect-metadata'
import '@shared/container'
import App from './App'
import { container } from 'tsyringe'
import logger from '@infra/config/log/Logger'

const app = container.resolve(App)

const appPort = process.env.APP_PORT === '' ? '3003' : process.env.APP_PORT
app.express.listen(appPort, () => {
  logger.debug(`Posterr is running at port: ${appPort ?? ''}`)
})
