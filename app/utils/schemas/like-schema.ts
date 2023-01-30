import type { Like as PrismaLike } from '@prisma/client'
import type { SerializeFrom } from '@remix-run/node'
import { SerializedPost } from './post-schema'

export type Like = SerializeFrom<PrismaLike> & {
  post: SerializedPost
}
