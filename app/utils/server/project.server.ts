import { prisma } from './prisma.server'

export type ProjectCategories = {
  id: string
  value: string
  label: string
}
export async function getProjects() {
  const projects = await prisma.project.findMany({
    include: {
      categories: true,
      user: {
        select: {
          id: true,
          userName: true,
          avatarUrl: true,
          email: true
        }
      }
    }
  })

  return { projects }
}

export async function getProjectById(id: string) {
  const project = await prisma.project.findUnique({
    where: {
      id
    },
    include: {
      categories: true,
      user: {
        select: {
          id: true,
          userName: true,
          avatarUrl: true,
          email: true
        }
      }
    }
  })

  return project
}
