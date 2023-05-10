import { Request, Response } from 'express'
import { CreateUser } from '../../../usecase/User'
import { UserRepository } from '../../../repositories/UserRepository'

export default async function CreateUserController(request: Request, response: Response) {
  try {

    const { nome, cpf } = request.body

    const createUser = new CreateUser(
      new UserRepository()
    )

    const user = await createUser.execute(nome, cpf)

    return response.json({
      error: false,
      message: 'Usuário cadastrado com Sucesso!',
      data: user
    })

  } catch (e: any) {
    return response.json({ message: e.message })
  }
}