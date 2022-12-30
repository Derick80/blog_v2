import type { Like } from '~/utils/schemas/like-schema'
import type { Post } from '~/utils/schemas/post-schema'
import { prisma } from './prisma.server'

export type CategoryForm = {
  value: string
}[]

type QueriedPost = Post & {
  likes?: Like[]
  _count: {
    comments?: number
    likes?: number
  }
}

export async function getMyPosts(email: string) {
  const posts = await prisma.post.findMany({
    where: {
      user: {
        email
      }
    },

    include: {
      _count: true,
      categories: true,
      likes: true,
      comments: {
        include: {
          user: true
        }
      }
    }
  })
  return posts
}
export async function getUserPosts(userId: string) {
  const posts = await prisma.post.findMany({
    where: {
      userId
    },
    include: {
      categories: true,
      likes: true,
      comments: {
        include: {
          user: true
        }
      }
    }
  })
  return posts
}

export async function getPosts() {
  const initialPosts = await prisma.post.findMany({
    where: {
      published: true
    },
    include: {
      categories: true,
      likes: true,
      comments: {
        include: {
          user: true
        }
      }
    }
  })
  return initialPosts
}

export async function getPostById(id: string) {
  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      likes: true,
      comments: {
        include: {
          user: true
        }
      }
    }
  })
  return post
}

export type PostInput = {
  title: string
  description: string
  body: string
  postImg: string
  createdBy: string
  userId: string
  correctedCategories: CategoryForm
}
export async function createPost(data: PostInput) {
  const post = await prisma.post.create({
    data: {
      title: data.title,
      description: data.description,
      body: data.body,
      postImg: data.postImg,
      createdBy: data.createdBy,
      user: {
        connect: {
          id: data.userId
        }
      },
      categories: {
        connectOrCreate: data.correctedCategories.map((category) => ({
          where: {
            value: category.value
          },
          create: {
            value: category.value,
            label: category.value
          }
        }))
      }
    }
  })
  return post
}
