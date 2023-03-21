import { Book as PrismaBook } from '@prisma/client'
import { User } from './user-schema'

export type Book = PrismaBook & {
  categories: {
    value: string
  }[]
}
