import { Router } from 'express'
export const contactRoutes = Router()

import {
  CreateContactController,
  ListContactController,
  GetContactController,
  GetUserContactsController,
  UpdateContactController,
  DeleteContactController
} from '../../controllers/contact/ContactController'

contactRoutes.post('/', CreateContactController)
contactRoutes.get('/', ListContactController)
contactRoutes.get('/:contactId', GetContactController)
contactRoutes.put('/:contactId', UpdateContactController)
contactRoutes.get('/:userId/contacts', GetUserContactsController)
contactRoutes.delete('/:contactId', DeleteContactController)