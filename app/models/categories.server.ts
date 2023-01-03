import { Category, SerializedPost } from './post.server'
import { prisma } from './prisma.server'

export default async function getAllCategories() {
  const categories = await prisma.category.findMany({
    select: {
      value: true,
      label: true
    },
    distinct: ['value']
  })
  return categories
}

export async function getPostsByCategoryNameId(value: string) {
  const category = await prisma.category
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

  return category
}
