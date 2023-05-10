import ContactResponse from './ContactResponse'

type CreateContactResponse = {
  error: boolean,
  message: string,
  data: ContactResponse[]
}

export default CreateContactResponse