import type { Category, Post as PrismaPost } from '@prisma/client'
import type { SerializeFrom } from '@remix-run/node'
import type { Comment } from './comment-schema'
import type { Like } from './like-schema'
import type { User } from './user-schema'
export type Post = Partial<PrismaPost> & {
  likes?: Like[]
  _count: {
    comments?: number
    likes: number
  }

  comments?: Comment[]
  categories?: Category[]
  user: User
}

export type SerializedPost = SerializeFrom<Post>
