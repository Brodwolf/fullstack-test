import { ContactType } from '@prisma/client'
import { ContactRepositoryInterface } from '../../interfaces/ContactRepositoryInterface'

class CreateContact {
  constructor(
    private ContactRepository: ContactRepositoryInterface
  ) { }

  public async execute(userId: number, tipo: ContactType, descricao: string) {
    return await this.ContactRepository.create(userId, tipo, descricao)
  }
}

export { CreateContact }