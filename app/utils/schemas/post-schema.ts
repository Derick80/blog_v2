import type { Category, Post as PrismaPost } from '@prisma/client'
import type { SerializeFrom } from '@remix-run/node'
import type { Comment, CommentWithChildren } from './comment-schema'
import type { Favorite } from './favorite.schema'
import type { Like } from './like-schema'
import type { User } from './user-schema'

export type Post = PrismaPost & {
  _count: {
    comments: number
    likes: number
    favorites: number
  }
  likes: Like[]
  comments: CommentWithChildren[]
  categories: Category[]
  favorites: Favorite[]
  user: User
}

export type SerializedPost = SerializeFrom<Post>

type EditPosts = PrismaPost & {
  categories: Category[]
  user: User
}

export type SerializedEditPost = SerializeFrom<EditPosts>
