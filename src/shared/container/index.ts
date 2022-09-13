import { IDatabase } from 'infra/config/database/IDatabase'
import { MongoDB } from '../../infra/config/database/impl/MongoDB'
import { container } from 'tsyringe'

container.registerSingleton<IDatabase>(
  'DatabaseImpl',
  MongoDB
)
