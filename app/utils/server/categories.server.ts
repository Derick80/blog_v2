import { prisma } from './prisma.server'

export default async function getAllCategories() {
  const categories = await prisma.category.findMany({
    distinct: ['value'],
    orderBy:{
      value: 'asc'
    }
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

export async function createCategory(value: string) {
  const category = await prisma.category.create({
    data: {
      value: value,
      label: value
    }
  })

  return category
}
