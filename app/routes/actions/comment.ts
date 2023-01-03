import { ActionFunction } from '@remix-run/node'
import { createComment } from '~/models/comments.server'

export const action: ActionFunction = async ({ request, params }) => {
  const body = await new URLSearchParams(await request.text())
  const message = body.get('message')
  const userId = body.get('userId')
  const postId = body.get('postId')
  const createdBy = body.get('createdBy')

  if (!message || !userId || !postId || !createdBy) {
    return {
      status: 400,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ error: 'Missing required fields' })
    }
  }

  const comment = await createComment({
    message,
    userId,
    postId,
    createdBy
  })
  return {
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(comment)
  }
}
