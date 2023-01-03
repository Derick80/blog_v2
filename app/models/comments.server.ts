import { Prisma } from '@prisma/client'
import { prisma } from './prisma.server'

export type CreateCommentInput = {
  message: string
  userId: string
  postId: string
  createdBy: string
}

export type CreateChildCommentInput = {
  commentId: string
} & CreateCommentInput

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

export async function createChildComment(input: CreateChildCommentInput) {
  const comment = await prisma.comment.create({
    data: {
      message: input.message,
      parent: {
        connect: {
          id: input.commentId
        }
      },
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

export async function deleteComment(commentId: string) {
  const deleted = await prisma.comment.delete({
    where: {
      id: commentId
    }
  })
  return deleted
}

type DeleteProps = {
  postId: string
  commentId: string
}
export async function deleteByPost({ postId, commentId }: DeleteProps) {
  const deled = await prisma.post.delete({
    where: {
      id: postId
    },
    data: {
      comments: {
        delete: {
          id: commentId
        }
      }
    }
  })

  return deled
}
