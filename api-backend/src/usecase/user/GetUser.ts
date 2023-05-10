import { UserRepositoryInterface } from '../../interfaces/UserRepositoryInterface'

class GetUser {
  constructor(
    private UserRepository: UserRepositoryInterface
  ) { }

  public async execute(id: number) {
    return await this.UserRepository.getUser(id)
  }
}

export { GetUser }