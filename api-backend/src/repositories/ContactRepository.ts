import { prisma } from '../database'
import { Contact, ContactType } from '@prisma/client'
import { ContactRepositoryInterface } from '../interfaces/ContactRepositoryInterface'

class ContactRepository implements ContactRepositoryInterface {
  public async create(userId: number, tipo: ContactType, descricao: string): Promise<Contact> {
    return await prisma.contact.create({
      data: {
        tipo,
        descricao,
        userId
      }
    })
  }

  public async getContact(id: number): Promise<Contact | null> {
    return await prisma.contact.findFirst({
      where: {
        id
      }
    })
  }

  public async getUserContact(userId: number): Promise<Contact[] | null> {
    return await prisma.contact.findMany({
      where: {
        userId: {
          equals: userId
        }
      }
    })
  }

  public async findMany(): Promise<Contact[] | null> {
    return await prisma.contact.findMany({
      include: {
        user: true
      },
      orderBy: {
        id: 'asc'
      }
    })
  }

  public async update(contactId: number, tipo: ContactType, descricao: string): Promise<Contact> {
    return await prisma.contact.update({
      where: {
        id: contactId
      },
      data: {
        tipo,
        descricao
      }
    })
  }

  public async delete(contactId: number): Promise<void> {
    await prisma.contact.delete({
      where: {
        id: contactId
      }
    })
  }
}

export { ContactRepository }