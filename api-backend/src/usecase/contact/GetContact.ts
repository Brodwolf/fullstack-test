import { ContactType } from '@prisma/client'
import { ContactRepositoryInterface } from '../../interfaces/ContactRepositoryInterface'

class GetContact {
  constructor(
    private ContactRepository: ContactRepositoryInterface
  ) { }

  public async execute(id: number) {
    return await this.ContactRepository.getContact(id)
  }
}

export { GetContact }