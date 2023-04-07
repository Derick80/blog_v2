import type { Prisma } from '@prisma/client'
import { prisma } from './prisma.server'

export const createLike = async (input: Prisma.LikeCreateInput) => {
  const created = await prisma.like.create({
    data: input
  })

  return created
}

export const deleteLike = async (
  input: Prisma.LikePostIdUserIdCompoundUniqueInput
) => {
  const deleted = prisma.like.delete({
    where: {
      postId_userId: input
    }
  })

  return deleted
}

export async function getLikeCounts() {
  const maxLikes = await prisma.like.aggregate({
    _count: {
      _all: true
    },
    _max: {
      postId: true
    }
  })
  return maxLikes
}
