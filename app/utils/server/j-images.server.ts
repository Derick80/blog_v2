import { JapanImages } from '@prisma/client'
import { prisma } from './prisma.server'

export async function getJImages() {
  return await prisma.japanImages.findMany({
    orderBy: {
      id: 'asc'
    }
  })
}

export async function getJImageById(id: number) {
  const image = await prisma.japanImages.findUnique({
    where: {
      id: id
    }
  })
  if (!image) {
    throw new Error('No image found')
  }
  return image
}

export async function updateJImage(input: Partial<JapanImages>) {
  const { id, ...data } = input
  const image = await prisma.japanImages.update({
    where: {
      id: id
    },
    data: data
  })
  return image
}
