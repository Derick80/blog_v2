import { json, redirect } from '@remix-run/node'
import { isAuthenticated } from '~/utils/server/auth/auth.server'
import { prisma } from '~/utils/server/prisma.server'
import type { ActionArgs, LoaderArgs } from '@remix-run/node' // or cloudflare/deno

export async function loader({ request, params }: LoaderArgs) {
  const user = await isAuthenticated(request)
  if (!user) {
    throw new Response('Unauthorized', { status: 401 })
  }

  const commentId = params.commentId
  if (!commentId) {
    throw new Response('Invalid commentId', { status: 400 })
  }

  const comment = await prisma.comment.findUnique({
    where: {
      id: commentId
    }
  })

  if (!comment) {
    throw new Response('Comment not found', { status: 404 })
  }

  return json({
    comment
  })
}

export async function action({ request, params }: ActionArgs) {
  const user = await isAuthenticated(request)
  if (!user) {
    throw new Response('Unauthorized', { status: 401 })
  }

  const formData = await request.formData()
  const commentId = formData.get('commentId')
  const postId = formData.get('postId')
  const userId = formData.get('userId')
  const message = formData.get('message')

  if (!commentId || !postId || !userId || !message) {
    return json({ error: 'invalid form data' }, { status: 400 })
  }

  if (
    typeof commentId !== 'string' ||
    typeof postId !== 'string' ||
    typeof userId !== 'string' ||
    typeof message !== 'string'
  ) {
    return json({ error: 'invalid form data' }, { status: 400 })
  }

  await prisma.comment.update({
    where: {
      id: commentId
    },
    data: {
      message
    }
  })

  return json({ success: true })
}
