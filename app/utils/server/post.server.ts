import { Post } from '../schemas/post-schema'
import { prisma } from './prisma.server'

export type CategoryForm = {
  value: string
}[]
export async function getHeroPost() {
  const post = await prisma.post.findFirst({
    select: {
      id: true,
      title: true,
      description: true,
      body: true,
      imageUrl: true,
      createdAt: true,
      updatedAt: true,
      published: true,
      createdBy: true,
      userId: true,
      categories: true,
      user: true,
      comments: {
        include: {
          user: true
        }
      },
      favorites: true,
      likes: true
    },
    take: 1,
    orderBy: {
      createdAt: 'desc'
    }
  })

  return post
}

export async function getUserPosts(userId: string) {
  const posts = await prisma.post.findMany({
    where: {
      userId
    },
    include: {
      categories: true,
      user: {
        include: {
          _count: true
        }
      },
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
  return await prisma.post.findMany({
    where: {
      published: true
    },

    include: {
      comments: {
        include: {
          user: true,
          children: {
            include: {
              user: true
            }
          }
        }
      },
      user: true,
      categories: true,
      _count: true,
      likes: true,
      favorites: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
}

export async function getPostById(id: string) {
  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      comments: {
        include: {
          user: true,
          children: {
            include: {
              user: true
            }
          }
        }
      },
      user: true,
      categories: true,
      _count: true,
      likes: true,
      favorites: true
    }
  })
  return post
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

//  typesafe getPostToEdit function
export async function getPostToEdit(id: string) {
  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      categories: true,
      user: true
    }
  })
  return post
}

// creation functions
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
      _count: true,
      categories: true,
      user: true,
      comments: {
        include: {
          user: true
        }
      },
      likes: true,
      favorites: true
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
