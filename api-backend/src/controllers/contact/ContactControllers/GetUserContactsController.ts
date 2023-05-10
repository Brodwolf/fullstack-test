import { Request, Response } from 'express'
import { GetUserContacs } from '../../../usecase/Contact'
import { ContactRepository } from '../../../repositories/ContactRepository'

export default async function GetUserContactsController(request: Request, response: Response) {
  try {

    const { userId } = request.params

    const userContacts = new GetUserContacs(
      new ContactRepository()
    )

    const contactList = await userContacts.execute(Number(userId))

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