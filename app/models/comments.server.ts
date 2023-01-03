// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Comment, Prisma } from '@prisma/client'
import { prisma } from './prisma.server'

export type CreateCommentInput = {
  message: string
  userId: string
  postId: string
  createdBy: string
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
      createdBy: input.createdBy
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
  results: {
    id: string
    message: string
    postId: string
    userId: string
    createdAt: Date
    updatedAt: Date
    createdBy: string
    userName: string
    email: string
    avatarUrl: string
  }
}

export async function getCommentsAndUserData() {
  const result = await prisma.comment.findMany({
    include: {
      user: true,
      post: true
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

      userName: comment.user.userName,
      email: comment.user.email,
      avatarUrl: comment.user.avatarUrl
    }
  })
  return results
}
