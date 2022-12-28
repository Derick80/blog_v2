import type { Category, Post as PrismaPost } from '@prisma/client'
import { SerializeFrom } from '@remix-run/node'

export type Post = Partial<PrismaPost> & {
  linkCount?: number | null
  isLiked?: boolean | null
  commentCount?: number | null
  comments?: Post[]
  categories?: Category[]
}

export type SerializedPost = SerializeFrom<Post>
