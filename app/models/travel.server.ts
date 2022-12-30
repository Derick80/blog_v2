import { TravelLog } from '@prisma/client'
import { prisma } from './prisma.server'

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
