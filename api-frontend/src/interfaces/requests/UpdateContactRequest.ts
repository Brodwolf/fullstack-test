import EnumContactType from "@/enum/EnumContactType"

type UpdateContactRequest = {
  tipo: EnumContactType,
  descricao: string
}

export default UpdateContactRequest