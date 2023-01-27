import type { Comment as PrismaComment } from '@prisma/client'
import type { SerializeFrom } from '@remix-run/node'
import type { User } from './user-schema'

export type Comments = PrismaComment & {
  user: User
}

export type Comment = SerializeFrom<Comments>

export type OnlyComments = Omit<Comments, 'user'>
export type CommentWithChildren = Comment & {
  children: Array<CommentWithChildren>
}
