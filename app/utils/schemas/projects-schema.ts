import type { Category, Project as PrismaProject } from '@prisma/client'
import type { SerializeFrom } from '@remix-run/node'

export type ProjectType = PrismaProject & {
  categories: Category[]
}

export type Project = SerializeFrom<ProjectType>

export type Categories = {
  categories: Category[]
}
