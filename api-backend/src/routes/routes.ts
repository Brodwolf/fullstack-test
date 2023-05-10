import { Router } from 'express'
import { userRoutes } from './user/user-routes'
import { contactRoutes } from './contact/contact-routes'

export const routes = Router()

routes.use('/users', userRoutes)
routes.use('/contacts', contactRoutes)