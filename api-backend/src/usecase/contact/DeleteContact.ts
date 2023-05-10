import { ContactRepositoryInterface } from '../../interfaces/ContactRepositoryInterface'

class DeleteContact {
  constructor(
    private ContactRepository: ContactRepositoryInterface
  ) { }

  public async execute(id: number) {
    return await this.ContactRepository.delete(id)
  }
}

export { DeleteContact }