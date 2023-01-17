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
      user: true
    }
  })

  const categories = projects.map((project) => project.categories)

  const cats = categories.map((cat) => cat)

  return { projects, cats }
}
