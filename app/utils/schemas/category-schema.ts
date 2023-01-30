

import type{Category as PrismaCategory, Project} from '@prisma/client'
import type {  SerializedPost } from './post-schema'

export type Category = PrismaCategory & {
    posts: SerializedPost[]
    projects: Project[]
}