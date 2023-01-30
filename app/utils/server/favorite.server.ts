import type { Prisma, User } from '@prisma/client'
import { prisma } from './prisma.server'

export async function getFavoriteList(userId: string) {
  const list = await prisma.favorite.findMany({
    where: {
      userId: userId
    },
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      post: {
        include: {
          user: true
        }
      }
    }
  })

  return list
}

export async function getPostFavorite(
  input: Prisma.FavoritePostIdUserIdCompoundUniqueInput
) {
  const favorite = await prisma.favorite.findUnique({
    where: {
      postId_userId: input
    }
  })

  return favorite
}

export async function createFavorite(input: Prisma.FavoriteCreateInput) {
  const created = await prisma.favorite.create({
    data: input
  })

  return created
}

export async function deleteFavorite(
  input: Prisma.FavoritePostIdUserIdCompoundUniqueInput
) {
  const deleted = prisma.favorite.delete({
    where: {
      postId_userId: input
    }
  })

  return deleted
}

export async function getFavoriteCounts() {
  const maxFavorites = await prisma.favorite.aggregate({
    _count: {
      _all: true
    },
    _max: {
      postId: true
    }
  })
  return maxFavorites
}
