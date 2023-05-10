import UserResponse from './UserResponse'

type GetUserResponse = {
  error: boolean,
  message: string,
  data: UserResponse
}

export default GetUserResponse