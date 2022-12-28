import { Like } from '~/utils/schemas/like-schema'
import { Post } from '~/utils/schemas/post-schema'
import { prisma } from './prisma.server'

type QueriedPost = Post & {
  likes?: Like[]
  _count: {
    comments?: number
    likes?: number
  }
}

export async function getUserPosts(userId: string) {
  const posts = await prisma.post.findMany({
    where: {
      userId,
    },
    include: {
      likes: true,
      comments: {
        include: {
          user: true,
        },
      },
    },
  })
  return posts
}

export async function getPosts(){
  const initialPosts = await prisma.post.findMany({
    where: {
      published: true,
    },

  })
}

export async function getPostById(id: string) {
  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      likes: true,
      comments: {
        include: {
          user: true,
        },
      },
    },
  })
  return post
}