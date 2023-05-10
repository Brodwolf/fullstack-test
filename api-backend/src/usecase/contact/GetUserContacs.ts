import { ContactType } from '@prisma/client'
import { ContactRepositoryInterface } from '../../interfaces/ContactRepositoryInterface'

class GetUserContacs {
  constructor(
    private ContactRepository: ContactRepositoryInterface
  ) { }

  public async execute(userId: number) {
    return await this.ContactRepository.getUserContact(userId)
  }
}

export { GetUserContacs }