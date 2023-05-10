import { Request, Response } from 'express'
import { ListContact } from '../../../usecase/Contact'
import { ContactRepository } from '../../../repositories/ContactRepository'

export default async function ListContactController(request: Request, response: Response) {
  try {

    const listContact = new ListContact(
      new ContactRepository()
    )

    const contact = await listContact.execute()

    if (!contact) {
      return response.json({
        error: false,
        message: 'Não foram encontrados registros!'
      })
    }

    return response.json({
      error: false,
      data: contact
    })

  } catch (e: any) {
    return response.json({ message: e.message })
  }
}