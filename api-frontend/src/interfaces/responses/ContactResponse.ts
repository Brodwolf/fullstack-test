import UserResponse from "./UserResponse"
import EnumContactType from "@/enum/EnumContactType"


type ContactResponse = {
  id: number,
  tipo: EnumContactType,
  descricao: string,
  userId: number,
  user: UserResponse
}

export default ContactResponse