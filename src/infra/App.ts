import express, { Request, Response } from 'express'
import cors from 'cors'
import { injectable, inject } from 'tsyringe'
import { IDatabase } from './config/database/IDatabase'
import routes from '@shared/routes/routes'
import swaggerUi from 'swagger-ui-express'
import swaggerDocs from '../swagger.json'

@injectable()
class App {
  public express: express.Application

  public constructor (@inject('DatabaseImpl') private readonly databaseImpl: IDatabase) {
    this.express = express()
    this.middleware()
    this.database()
    this.routes()
  }

  private middleware (): void {
    this.express.use(express.json())
    this.express.use(cors())
    this.express.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
  }

  private database (): void {
    this.databaseImpl.connect()
  }

  private routes (): void {
    this.express.use('/health', (_req: Request, res: Response): Response => {
      res.status(200)
      return res.json({ app: 'It\'s alive' })
    })
    this.express.use(routes)
  }
}

export default App
