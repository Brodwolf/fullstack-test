import ContactResponse from './ContactResponse'

type GetContactResponse = {
  error: boolean,
  message: string,
  data: ContactResponse
}

export default GetContactResponse