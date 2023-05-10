import { User } from '@prisma/client'

export interface UserRepositoryInterface {
  create(nome: string, cpf: string): Promise<User>
  getUser(id: number): Promise<User | null>
  findMany(): Promise<User[] | null>
  update(id: number, nome: string, cpf: string): Promise<User>
  delete(id: number): Promise<void>
}