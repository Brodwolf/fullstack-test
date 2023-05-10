import { ContactType } from '@prisma/client'
import { ContactRepositoryInterface } from '../../interfaces/ContactRepositoryInterface'

class UpdateContact {
  constructor(
    private ContactRepository: ContactRepositoryInterface
  ) { }

  public async execute(id: number, tipo: ContactType, descricao: string) {
    return await this.ContactRepository.update(id, tipo, descricao)
  }
}

export { UpdateContact }