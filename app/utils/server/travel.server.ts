import type { TravelLog } from '@prisma/client'
import { prisma } from './prisma.server'

export type CitiesAndAlbums = {
  id: number
  album: string
  city: string
  imageTitle: string
  imageDescription: string
  imageUrl: string
  year: string
  userId: string
}[]
export async function getAblumbyAblum() {
  return await prisma.travelLog.groupBy({
    by: ['album'],
    select: {
      album: true,
      city: true,
      imageTitle: true,
      imageDescription: true,
      imageUrl: true,
      year: true,
      userId: true
    }
  })
}
export async function getAlbums() {
  const citiesAndAlbums = await prisma.travelLog.findMany({
    orderBy: {
      year: 'desc'
    },

    select: {
      id: true,
      album: true,
      imageDescription: true,
      imageTitle: true,
      city: true,
      imageUrl: true,
      year: true,
      userId: true
    }
  })

  return citiesAndAlbums
}

export async function getTravelLog() {
  const travelLog = await prisma.travelLog.findMany({
    orderBy: {
      year: 'desc'
    }
  })

  return travelLog
}

export async function getTravelLogById(id: number) {
  const travelLog = await prisma.travelLog.findUnique({
    where: {
      id: id
    }
  })
  if (!travelLog) {
    throw new Error('No travelLog found')
  }
  return travelLog
}

export async function getTravelLogByAlbum(album: string) {
  const travelLog = await prisma.travelLog.findMany({
    where: {
      album: album
    }
  })
  if (!travelLog) {
    throw new Error('No travelLog found')
  }
  return travelLog
}

export async function createTravelLog(input: Omit<TravelLog, 'id'>) {
  const travelLog = await prisma.travelLog.create({
    data: {
      ...input
    }
  })
  return travelLog
}
export async function updateTravelLog(input: Partial<TravelLog>) {
  const { id, ...data } = input
  const image = await prisma.travelLog.update({
    where: {
      id: id
    },
    data: {
      ...data
    }
  })
  return image
}
