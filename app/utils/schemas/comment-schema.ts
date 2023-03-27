import type { Comment as PrismaComment } from '@prisma/client'
import type { SerializeFrom } from '@remix-run/node'
import type { User } from './user-schema'

// using this type to get the comments without the user and for formatting the comments
export type Comments = SerializeFrom<PrismaComment> & {
  user: User
  children: Array<Comments>
}
// export type Comment = PrismaComment & {
//   user: User
//   children: Array<Comments>
// }
export type CommentWithChildren = Comments & {
  children: Array<Comments>
  user: User
}
