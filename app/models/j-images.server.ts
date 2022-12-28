import { prisma } from './prisma.server'

export async function getJImages() {
  return await prisma.japanImages.findMany({
    orderBy: {
      id: 'asc'
    }
  })
}
