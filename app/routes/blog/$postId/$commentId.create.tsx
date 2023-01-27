import { LoaderArgs, json, ActionArgs } from '@remix-run/node'
import { badRequest } from 'remix-utils'
import invariant from 'tiny-invariant'
import { User } from '~/utils/schemas/user-schema'
import { isAuthenticated } from '~/utils/server/auth/auth.server'
import { getCommentById } from '~/utils/server/comments.server'
import { getPostById } from '~/utils/server/post.server'
import { prisma } from '~/utils/server/prisma.server'
import { getUser } from '~/utils/server/user.server'

export async function loader({ params, request }: LoaderArgs) {
  return json({
    commentId: params.commentId
  })
}

export async function action({ request, params }: ActionArgs) {
  const user = await isAuthenticated(request)
  const userId = user?.id
  const createdBy = user?.userName
  const formData = await request.formData()
  const action = formData.get('action')
  const message = formData.get('message')
  const commentId = params.commentId
  const postId = params.postId
  invariant(commentId, 'commentId is required')
  invariant(postId, 'need post id')

  if (
    typeof commentId !== 'string' ||
    typeof userId !== 'string' ||
    typeof message !== 'string' ||
    typeof createdBy !== 'string' ||
    typeof userId !== 'string' ||
    typeof postId !== 'string'
  ) {
    return badRequest('bad')
  }

  switch (action) {
    case 'reply': {
      return await prisma.comment.create({
        data: {
          message,
          createdBy,
          userId,
          post: {
            connect: {
              id: postId
            }
          }
        }
      })
    }
  }
}
