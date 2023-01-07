import type { User as PrismaUser } from '@prisma/client'

export type User = Omit<PrismaUser, 'password' | 'createdAt' | 'updatedAt'>

export type UserType = User & {
  _count: {
    accounts: number
    tokens: number
    posts: number
    comments: number
    likes: number
    projects: number
  }
}
