import { UserRepositoryInterface } from '../../interfaces/UserRepositoryInterface'

class DeleteUser {
  constructor(
    private UserRepository: UserRepositoryInterface
  ) { }

  public async execute(id: number) {
    return await this.UserRepository.delete(id)
  }
}

export { DeleteUser }