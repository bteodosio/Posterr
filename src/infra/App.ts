import express from 'express'
import cors from 'cors'
import { injectable, inject } from 'tsyringe'
import { IDatabase } from './config/database/IDatabase'

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
  }

  private database (): void {
    this.databaseImpl.connect()
  }

  private routes (): void {
    this.express.get('/', (_req, res) => {
      return res.send('Hello World')
    })
  }
}

export default App
