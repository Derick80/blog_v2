// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Comment, Prisma } from '@prisma/client'
import { prisma } from './prisma.server'

export async function getChildCommentsByParentId({
  parentId
}: {
  parentId: string
}) {
  const comments = await prisma.comment.findMany({
    where: {
      parentId: parentId
    }
  })
  return comments
}

export type CreateCommentInput = {
  message: string
  userId: string
  postId: string
  createdBy: string
  parentId?: string
}

export async function createComment(input: CreateCommentInput) {
  const comment = await prisma.comment.create({
    data: {
      message: input.message,
      user: {
        connect: {
          id: input.userId
        }
      },
      post: {
        connect: {
          id: input.postId
        }
      },

      createdBy: input.createdBy,
      ...(input?.parentId && {
        parent: {
          connect: {
            id: input.parentId
          }
        }
      })
    }
  })
  return comment
}

export async function createChildComment(input: CreateCommentInput) {
  const comment = await prisma.comment.create({
    data: {
      message: input.message,
      user: {
        connect: {
          id: input.userId
        }
      },
      post: {
        connect: {
          id: input.postId
        }
      },
      createdBy: input.createdBy,
      parent: {
        connect: {
          id: input.parentId
        }
      }
    }
  })
  return comment
}

export async function getCommentById(commentId: string) {
  const comment = await prisma.comment.findUnique({
    where: {
      id: commentId
    }
  })
  return comment
}

type editCommentInput = {
  commentId: string
  message: string
  postId: string
  userId: string
}
export async function editPostComment(input: editCommentInput) {
  const updated = await prisma.comment.update({
    where: {
      id: input.commentId
    },
    data: {
      message: input.message,
      post: {
        connect: {
          id: input.postId
        }
      },
      user: {
        connect: {
          id: input.userId
        }
      }
    }
  })

  return updated
}
export async function editComment(commentId: string, message: string) {
  const updated = await prisma.comment.update({
    where: {
      id: commentId
    },
    data: {
      message
    }
  })

  return updated
}

export async function deleteComment(commentId: string) {
  const deleted = await prisma.comment.delete({
    where: {
      id: commentId
    }
  })
  return deleted
}

export type CommentAndUserData = {
  id: string
  message: string
  postId: string
  userId: string
  createdAt: Date
  updatedAt: Date
  createdBy: string
  userName: string
  email: string
  avatarUrl: string | ''
  imageUrl: string | ''
  title: string | ''
  description: string | ''
  body: string | ''
  postedBy: string | ''
  postedAt: Date | ''
  published: boolean | ''
  _count: Prisma.PostCountAggregateOutputType | null
  likes: string[] | [] | null
  comments: Comment
  favorites: string[]
}

export async function getCommentsAndUserData() {
  const result = await prisma.comment.findMany({
    include: {
      user: true,
      post: {
        include: {
          comments: true,
          _count: true,
          likes: true,
          favorites: true
        }
      }
    }
  })

  const results = result.map((comment) => {
    return {
      id: comment.id,
      title: comment.post.title,
      description: comment.post.description,
      body: comment.post.body,
      imageUrl: comment.post.imageUrl,
      postedBy: comment.post.createdBy,
      postedAt: comment.post.createdAt,
      message: comment.message,
      postId: comment.postId,
      userId: comment.userId,
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt,
      createdBy: comment.createdBy,
      published: comment.post.published,

      comment: comment.post.comments,
      userName: comment.user.userName,
      email: comment.user.email,
      avatarUrl: comment.user.avatarUrl,
      _count: comment.post._count,
      likes: comment.post.likes
    }
  })
  return results
}
