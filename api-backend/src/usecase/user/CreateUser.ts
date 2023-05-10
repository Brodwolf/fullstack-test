import { UserRepositoryInterface } from '../../interfaces/UserRepositoryInterface'

class CreateUser {
  constructor(
    private UserRepository: UserRepositoryInterface
  ) { }

  public async execute(nome: string, cpf: string) {
    return await this.UserRepository.create(nome, cpf)
  }
}

export { CreateUser }