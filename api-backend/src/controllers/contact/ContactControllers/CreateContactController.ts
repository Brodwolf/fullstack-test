import { Request, Response } from 'express'
import { CreateContact } from '../../../usecase/Contact'
import { ContactRepository } from '../../../repositories/ContactRepository'

export default async function CreateContactController(request: Request, response: Response) {
  try {

    const { userId, tipo, descricao } = request.body

    const createContact = new CreateContact(
      new ContactRepository()
    )

    const contact = await createContact.execute(userId, tipo, descricao)

    return response.json({
      error: false,
      message: 'Contato cadastrado com Sucesso!',
      data: contact
    })

  } catch (e: any) {
    return response.json({ message: e.message })
  }
}