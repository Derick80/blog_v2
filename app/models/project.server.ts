import { prisma } from './prisma.server'

export async function getProjects() {
  const res = await prisma.project.findMany({
    include: {
      categories: true,
      user: true
    }
  })
  console.log(res)

  return res
}
