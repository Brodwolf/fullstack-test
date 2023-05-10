import UserResponse from './UserResponse'

type CreateUserResponse = {
  error: boolean,
  message: string,
  data: UserResponse[]
}

export default CreateUserResponse