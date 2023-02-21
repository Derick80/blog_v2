import { Category, Project as PrismaProject } from '@prisma/client'
import { SerializeFrom } from '@remix-run/node'

export type ProjectType = PrismaProject & {
  categories: Category[]
}

export type Project = SerializeFrom<ProjectType>
