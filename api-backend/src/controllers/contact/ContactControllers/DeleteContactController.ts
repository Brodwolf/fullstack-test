import { Request, Response } from 'express'
import { DeleteContact } from '../../../usecase/Contact'
import { ContactRepository } from '../../../repositories/ContactRepository'

export default async function DeleteContactController(request: Request, response: Response) {
  try {

    const { contactId } = request.params

    const deleteContact = new DeleteContact(
      new ContactRepository()
    )

    await deleteContact.execute(Number(contactId))

    return response.json({
      error: false,
      message: 'Contato deletado com Sucesso!',
    })

  } catch (e: any) {
    return response.json({ message: e.message })
  }
}