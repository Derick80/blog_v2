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
