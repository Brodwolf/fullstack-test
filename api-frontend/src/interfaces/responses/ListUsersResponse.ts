import UserResponse from './UserResponse'

type ListUsersResponse = {
  error: boolean,
  message: string,
  data: UserResponse[]
}

export default ListUsersResponse