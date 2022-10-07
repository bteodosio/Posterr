import "reflect-metadata"
import { container } from "tsyringe"
import InterfaceRegistration from '@shared/container/InterfaceRegistration'

container.clearInstances()

InterfaceRegistration.registerInterface()
