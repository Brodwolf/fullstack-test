import { Request, Response } from 'express'
import { GetUser } from '../../../usecase/User'
import { UserRepository } from '../../../repositories/UserRepository'
import { Prisma } from '@prisma/client'

export default async function GetUserController(request: Request, response: Response) {
  try {

    const { userId } = request.params

    const getUser = new GetUser(
      new UserRepository()
    )

    

    const user = await getUser.execute(Number(userId))

    if (!user) {
      return response.json({
        error: false,
        message: 'Não foram encontrados registros!'
      })
    }

    return response.json({
      error: false,
      data: user
    })

  } catch (e: any) {
    return response.json({ message: e.message })
  }
}