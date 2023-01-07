import { Comment as PrismaComment } from '@prisma/client'
import { User } from './user-schema'

export type Comment = PrismaComment & User
