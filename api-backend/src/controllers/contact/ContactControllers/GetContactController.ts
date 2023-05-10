import { Request, Response } from 'express'
import { GetContact } from '../../../usecase/Contact'
import { ContactRepository } from '../../../repositories/ContactRepository'

export default async function GetContactController(request: Request, response: Response) {
  try {

    const { contactId } = request.params

    const contact = new GetContact(
      new ContactRepository()
    )

    const contactList = await contact.execute(Number(contactId))

    if (!contactList) {
      return response.json({
        error: false,
        message: 'Não foram encontrados registros!'
      })
    }

    return response.json({
      error: false,
      data: contactList
    })

  } catch (e: any) {
    return response.json({ message: e.message })
  }
}