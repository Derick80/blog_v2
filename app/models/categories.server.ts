import type { PostAndCategories } from './post.server'
import { prisma } from './prisma.server'

export default async function getAllCategories() {
  const categories = await prisma.category.findMany({
    distinct: ['value']
  })
  return categories
}

export async function getPostsByCategoryNameId(value: string) {
  const categories = await prisma.category
    .findUnique({
      where: {
        value: value
      }
    })
    .posts({
      include: {
        categories: true
      }
    })

  return categories
}
