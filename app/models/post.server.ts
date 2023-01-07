import { Favorite } from '@prisma/client'
import type { SerializeFrom } from '@remix-run/node'
import type { Like } from '~/utils/schemas/like-schema'
import type { Post } from '~/utils/schemas/post-schema'
import { UserType } from '~/utils/utils'
import { prisma } from './prisma.server'
export const defaultSelect = {
  id: true,
  username: true,
  email: true,
  emailVerified: true,
  displayName: true,
  displayImage: true,
  role: true,
  weeklyDigestEmail: true,
  createdAt: false,
  passwordHash: false
}

export const PostSelect = {
  id: true,
  title: true,
  description: true,
  imageUrl: true,
  body: true,
  published: true,
  createdAt: true,
  updatedAt: true,
  createdBy: true,
  categories: true,
  likes: true,
  comments: true,
  user: true,
  userId: true,
  favorites: true,
  _count: true
}
export type CategoryForm = {
  value: string
}[]

export type Category = {
  id: string
  value: string
  label: string
}

export type PostAndCategories = Omit<Post, 'categories'> & {
  categories: Category
}

type QueriedPost = Post & {
  likes?: Like[]
  favorites?: Favorite[]
  _count: {
    comments?: number
    likes?: number
    favorites?: number
  }
  user?: UserType
}

export type PostAndComments = QueriedPost & {
  comments: {
    id: string
    postId: string
    userId: string
    message: string
    createdBy: string
    user: {
      id: string
      username: string
      avatarUrl: string
      createdBy: string
    }
  }
}

export type serializedQueriedPost = SerializeFrom<QueriedPost>
export type SerializedCategory = SerializeFrom<Category>

export type SerializedPost = SerializeFrom<Post>

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
      comments: {
        include: {
          user: true
        }
      },
      categories: true,
      _count: true,
      likes: true,
      favorites: true
    }
  })
  const res = initialPosts.map((post) => {
    const { _count, comments, ...rest } = post
    return {
      ...rest,
      commentsCount: _count.comments,
      likesCount: _count.likes,
      comments,
    }
  })
  const posts = res.map((post) => {
    return {
      ...post,
      comments: post.comments.map((comment) => {
        const { user, ...rest } = comment
        return {
          ...rest
        }
      })
    }
  })




  return  posts
}

export async function getPostById(id: string) {
  const post = await prisma.post.findUnique({
    where: { id }
  })
  return post as QueriedPost
}

export type PostInput = {
  title: string
  description: string
  body: string
  imageUrl: string
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
      imageUrl: data.imageUrl,
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

export async function getUserDrafts(userId: string) {
  const posts = await prisma.post.findMany({
    where: {
      published: false,
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

export async function savePost(
  data: Partial<PostInput> & { postId: string } & {
    correctedCategories: CategoryForm
  }
) {
  const post = await prisma.post.update({
    where: { id: data.postId },
    data: {
      title: data.title,
      description: data.description,
      body: data.body,
      imageUrl: data.imageUrl,
      createdBy: data.createdBy,
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

export async function deletePost(id: string) {
  const success = await prisma.post.delete({
    where: { id }
  })
  return success
}

export async function publishPost(id: string) {
  const post = await prisma.post.update({
    where: { id },
    data: {
      published: true
    }
  })
  return post
}

export async function unPublishPost(id: string) {
  const post = await prisma.post.update({
    where: { id },
    data: {
      published: false
    }
  })
  return post
}

export async function getPostsAndComments() {
  const posts = await prisma.post
    .findMany({
      where: {
        published: true
      },

      include: {
        likes: true,
        categories: true,
        _count: true
      }
    })
    .then((posts) => {
      return posts.map((post) => {
        return {
          ...post,
          comments: prisma.comment.findMany({
            where: {
              postId: post.id
            },
            include: {
              user: true
            }
          })
        }
      })
    })
}
export async function getPostByCategoryValue(value: string) {
  const results = await prisma.post.findMany({
    where: {
      categories: {
        some: {
          value: value
        }
      }
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
  return results
}
