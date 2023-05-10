import ContactResponse from './ContactResponse'

type UpdateContactResponse = {
  error: boolean,
  message: string,
  data: ContactResponse[]
}

export default UpdateContactResponse