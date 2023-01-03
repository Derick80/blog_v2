import { prisma } from './prisma.server'

export async function getAbout() {
  const about = await prisma.about.findMany()
  return about
}
