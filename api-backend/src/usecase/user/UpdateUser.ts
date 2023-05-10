import { UserRepositoryInterface } from '../../interfaces/UserRepositoryInterface'

class UpdateUser {
  constructor(
    private UserRepository: UserRepositoryInterface
  ) { }

  public async execute(id: number, nome: string, cpf: string) {
    return await this.UserRepository.update(id, nome, cpf)
  }
}

export { UpdateUser }