import { prisma } from '../database'
import { User } from '@prisma/client'
import { UserRepositoryInterface } from '../interfaces/UserRepositoryInterface'

class UserRepository implements UserRepositoryInterface {
  public async create(nome: string, cpf: string): Promise<User> {
    return await prisma.user.create({
      data: {
        nome,
        cpf
      }
    })
  }

  public async update(id: number, nome: string, cpf: string): Promise<User> {
    return await prisma.user.update({
      where: {
        id
      },
      data: {
        nome,
        cpf
      }
    })
  }

  public async getUser(id: number): Promise<User | null> {
    return await prisma.user.findFirst({
      where: {
        id
      }
    })
  }

  public async findMany(): Promise<User[] | null> {
    return await prisma.user.findMany({
      orderBy: {
        id: 'asc'
      }
    })
  }

  public async delete(id: number): Promise<void> {
    await prisma.user.delete({
      where: {
        id
      }
    })
  }

}

export { UserRepository }