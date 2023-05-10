import EnumContactType from "@/enum/EnumContactType"

type CreateContactRequest = {
  userId: number,
  tipo: EnumContactType,
  descricao: string
}

export default CreateContactRequest