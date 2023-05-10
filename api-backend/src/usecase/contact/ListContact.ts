import { ContactRepositoryInterface } from '../../interfaces/ContactRepositoryInterface'

class ListContact {
  constructor(
    private ContactRepository: ContactRepositoryInterface
  ) { }

  public async execute() {
    return await this.ContactRepository.findMany()
  }
}

export { ListContact }