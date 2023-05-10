import { Request, Response } from 'express'
import { DeleteUser } from '../../../usecase/User'
import { UserRepository } from '../../../repositories/UserRepository'

export default async function DeleteUserController(request: Request, response: Response) {
  try {

    const { userId } = request.params

    const deleteUser = new DeleteUser(
      new UserRepository()
    )

    await deleteUser.execute(Number(userId))

    return response.json({
      error: false,
      message: 'Usuário deletado com Sucesso!',
    })

  } catch (e: any) {
    return response.json({ message: e.message })
  }
}