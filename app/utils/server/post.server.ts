import { Post } from '../schemas/post-schema'
import { prisma } from './prisma.server'
import {User} from '../schemas/user-schema'
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
      user: {
        select:{
           id:true,
           userName:true,
           avatarUrl:true,
           email:true,
          password:false
        }
       },
      comments: {
        include: {
          user: {
            select:{
               id:true,
               userName:true,
               avatarUrl:true,
               email:true,
                password:false

            }
           },
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
        select:{
            id:true,
            userName:true,
            avatarUrl:true,
            email:true,
            _count: true,
            password:false
              }
      },
      likes: true,
      comments: {
        include: {
          user: {
            select:{
               id:true,
               userName:true,
               avatarUrl:true,
               email:true,
               password:false

            }
           },
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
          user: {
            select:{
               id:true,
               userName:true,
               avatarUrl:true,
               email:true,

            }
           },
          children: {
            include: {
              user: {
                select:{
                   id:true,
                   userName:true,
                   avatarUrl:true,
                   email:true,
                   password:false

                }
               },
            }
          }
        }
      },
      user: {
        select:{
           id:true,
           userName:true,
           avatarUrl:true,
           email:true,
            password:false
        }
       },
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
          user: {
           select:{
              id:true,
              userName:true,
              avatarUrl:true,
              email:true,
              password:false

           }
          },
          children: {
            include: {
              user: {
                select:{
                   id:true,
                   userName:true,
                   avatarUrl:true,
                   email:true,
                    password:false

                }
               },
            }
          }
        }
      },


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
          user: {
            select:{
               id:true,
               userName:true,
               avatarUrl:true,
               email:true,
                password:false

            }
           },
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
      user: {
        select:{
           id:true,
           userName:true,
           avatarUrl:true,
           email:true,
            password:false

        }
       },
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
  category: CategoryForm
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
        connectOrCreate: data.category.map((category) => ({
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
      user: {
        select:{
           id:true,
           userName:true,
           avatarUrl:true,
           email:true,
            password:false

        }
       },
      comments: {
        include: {
          user: {
            select:{
               id:true,
               userName:true,
               avatarUrl:true,
               email:true,
                password:false

            }
           },
        }
      },
      likes: true,
      favorites: true
    }
  })

  return posts
}

export async function savePost(data: Partial<PostInput> & { postId: string }) {
  const post = await prisma.post.update({
    where: { id: data.postId },
    data: {
      title: data.title,
      description: data.description,
      body: data.body,
      imageUrl: data.imageUrl,
      createdBy: data.createdBy,
      categories: {
        set: data?.category?.map((category) => ({
          value: category.value
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
          user: {
            select:{
               id:true,
               userName:true,
               avatarUrl:true,
               email:true,
                password:false

            }
           },
        }
      },
    }
  })
  return results
}
