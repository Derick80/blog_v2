import type { Post as PrismaPost } from '@prisma/client'
import { SerializeFrom } from '@remix-run/node'

export type Post = Partial<PrismaPost> & {
  linkCount?: number | null
  isLiked?: boolean | null
  commentCount?: number | null
  comments?: Post[]
}

export type SerializedPost = SerializeFrom<Post>
