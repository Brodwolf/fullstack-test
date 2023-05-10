import { AxiosError } from 'axios'
import { useToast } from 'vue-toastification'

export const extractErrorMessage = (error: unknown, genericMessage?: string) => {
  if (error instanceof AxiosError) {
    if (error.response && error.response.data) {
      const { message } = error.response.data
      if (message) {
        return message as string
      }
    }
  }

  if (genericMessage) {
    return genericMessage
  }
}

export const handleServiceError = (error: unknown, genericMessage?: string) => {
  const message = extractErrorMessage(error, genericMessage)
  if (message) {
    const toast = useToast()
    toast.error(message)
  }
}
