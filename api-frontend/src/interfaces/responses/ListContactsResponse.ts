import ContactResponse from './ContactResponse'

type ListContactsResponse = {
  error: boolean,
  message: string,
  data: ContactResponse[]
}

export default ListContactsResponse