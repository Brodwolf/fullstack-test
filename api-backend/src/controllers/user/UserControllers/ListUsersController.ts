import { Request, Response } from 'express'
import { ListUsers } from '../../../usecase/User'
import { UserRepository } from '../../../repositories/UserRepository'

export default async function ListUsersController(request: Request, response: Response) {
  try {

    const listUsers = new ListUsers(
      new UserRepository()
    )

    const userList = await listUsers.execute()

    return response.json({
      error: false,
      data: userList
    })

  } catch (e: any) {
    return response.json({ message: e.message })
  }
}