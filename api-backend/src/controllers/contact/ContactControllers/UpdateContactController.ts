import { Request, Response } from 'express'
import { UpdateContact } from '../../../usecase/Contact'
import { ContactRepository } from '../../../repositories/ContactRepository'

export default async function UpdateContactController(request: Request, response: Response) {
  try {

    const { contactId } = request.params
    const { tipo, descricao } = request.body

    const updateContact = new UpdateContact(
      new ContactRepository()
    )

    const contact = await updateContact.execute(Number(contactId), tipo, descricao)

    return response.json({
      error: false,
      message: 'Contato atualizado com Sucesso!',
      data: contact
    })

  } catch (e: any) {
    return response.json({ message: e.message })
  }
}