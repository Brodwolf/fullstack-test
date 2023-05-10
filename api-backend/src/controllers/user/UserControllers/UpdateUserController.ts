import { Request, Response } from 'express'
import { UpdateUser } from '../../../usecase/User'
import { UserRepository } from '../../../repositories/UserRepository'

export default async function UpdateUserController(request: Request, response: Response) {
  try {

    const { userId } = request.params
    const { nome, cpf } = request.body

    const updateUser = new UpdateUser(
      new UserRepository()
    )

    const user = await updateUser.execute(Number(userId), nome, cpf)

    return response.json({
      error: false,
      message: 'Usuário atualizado com Sucesso',
      data: user
    })

  } catch (e: any) {
    return response.json({ message: e.message })
  }
}