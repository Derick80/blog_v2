import { Prisma } from '@prisma/client'
import { createPasswordHash } from './auth/auth-service.server'
import { prisma } from './prisma.server'

export type UserProps = {
  id: string
  email: string
  userName: string
  avatarUrl?: string
}

const defaultUserSelect = {
  id: true,
  email: true,
  userName: true,
  avatarUrl: true,

}
export async function getUsers() {
  const users = await prisma.user.findMany({
    select: defaultUserSelect
  })
  return users
}

export async function getUserById(userId: string) {
  return await prisma.user.findUnique({
    where: {
      id: userId
    }
  })
}



export const createUser = async (
  input: Prisma.UserCreateInput & {
    password?: string
    account?: Omit<Prisma.AccountCreateInput, 'user'>
  }
) => {
  const data: Prisma.UserCreateInput = {
    email: input.email,
    userName: input.userName
  }

  if (input.password) {
    data.password = await createPasswordHash(input.password)
  }

  if (input.account) {
    data.accounts = {
      create: [
        {
          provider: input.account.provider,
          providerAccountId: input.account.providerAccountId,
          accessToken: input.account.accessToken,
          refreshToken: input.account.refreshToken
        }
      ]
    }
  }

  return await prisma.user.create({
    data,
    select: defaultUserSelect
  })
}

export const getUser = async (input: Prisma.UserWhereUniqueInput) => {
  const user = await prisma.user.findUnique({
    where: input,
    select: defaultUserSelect
  })
  return user
}

export const getUserPasswordHash = async (
  input: Prisma.UserWhereUniqueInput
) => {
  const user = await prisma.user.findUnique({
    where: input
  })
  if (user) {
    return {
      user: { ...user, password: null },
      passwordHash: user.password
    }
  }
  return { user: null, passwordHash: null }
}
