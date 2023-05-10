import { Router } from 'express'
export const userRoutes = Router()

import { contactRoutes } from '../contact/contact-routes'

import {
  CreateUserController,
  GetUserController,
  ListUsersController,
  UpdateUserController,
  DeleteUserController
} from '../../controllers/user/UserController'

userRoutes.get('/', ListUsersController)
userRoutes.post('/', CreateUserController)
userRoutes.put('/:userId', UpdateUserController)
userRoutes.get('/:userId', GetUserController)
userRoutes.delete('/:userId', DeleteUserController)

userRoutes.use(contactRoutes)