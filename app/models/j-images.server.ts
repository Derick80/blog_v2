import { prisma } from './prisma.server'

export async function getJImages() {
  const images = await prisma.japanImages.findMany({
    orderBy: {
      id: 'asc'
    }
  })
  return images
}
