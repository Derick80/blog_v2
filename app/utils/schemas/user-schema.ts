import type { User as PrismaUser } from '@prisma/client'

export type User = Omit<PrismaUser, 'password' | 'createdAt' | 'updatedAt'> & {
  role: string
}

export type UserType = User & {
  _count: {
    favorites: number
    accounts: number
    tokens: number
    posts: number
    comments: number
    likes: number
    projects: number
    books: number
    messages: number
  }
}
