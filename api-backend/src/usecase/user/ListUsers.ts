import { UserRepositoryInterface } from '../../interfaces/UserRepositoryInterface'

class ListUsers {
  constructor(
    private UserRepository: UserRepositoryInterface
  ) { }

  public async execute() {
    return await this.UserRepository.findMany()
  }
}

export { ListUsers }