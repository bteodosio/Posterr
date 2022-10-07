import { IDatabase } from 'infra/config/database/IDatabase'
import { MongoDB } from '../../infra/config/database/impl/MongoDB'
import { container } from 'tsyringe'
import InterfaceRegistration from './InterfaceRegistration'

container.registerSingleton<IDatabase>(
  'DatabaseImpl',
  MongoDB
)

InterfaceRegistration.registerInterface()
