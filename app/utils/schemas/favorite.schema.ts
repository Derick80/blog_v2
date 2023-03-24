import type { Favorite as PrismaFavorites } from '@prisma/client'
import type { SerializeFrom } from '@remix-run/node'
import type { Post, SerializedPost } from './post-schema'

export type Favorite = SerializeFrom<PrismaFavorites> & {
  post: Post
}
