import type { Category, Post as PrismaPost } from '@prisma/client'
import type { SerializeFrom } from '@remix-run/node'
import type { Comments, CommentWithChildren } from './comment-schema'
import type { Favorite } from './favorite.schema'
import type { Like } from './like-schema'
import type { User } from './user-schema'

export type Post = PrismaPost

export type SerializedPost = SerializeFrom<Post>
export type PostWithChildren = SerializedPost & {
  comments: CommentWithChildren[]
  categories: Category[]
  favorites: Favorite[]
  likes: Like[]
  user: Partial<User>
  _count: {
    comments: number
    likes: number
    favorites: number
  }
}

export type SerialsizedPost = SerializeFrom<Post> & {
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

type EditPosts = PrismaPost & {
  categories: Category[]
  user: User
}

export type SerializedEditPost = SerializeFrom<EditPosts>
