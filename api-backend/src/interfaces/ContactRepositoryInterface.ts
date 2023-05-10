import { Contact, ContactType } from '@prisma/client'

export interface ContactRepositoryInterface {
  create(userId: number, tipo: ContactType, descricao: string): Promise<Contact>
  getContact(id: number): Promise<Contact | null>
  getUserContact(userId: number): Promise<Contact[] | null>
  findMany(): Promise<Contact[] | null>
  update(contactId: number, tipo: ContactType, descricao: string): Promise<Contact>
  delete(contactId: number): Promise<void>
}