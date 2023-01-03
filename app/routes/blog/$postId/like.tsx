import type { ActionFunction, LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { isAuthenticated } from '~/models/auth/auth.server'
import { createLike, deleteLike } from '~/models/likes.server'

export const loader: LoaderFunction = () => {
  throw new Response("This page doesn't exists.", { status: 404 })
}

export const action: ActionFunction = async ({ request, params }) => {
  const user = await isAuthenticated(request)
  const postId = params.postId
  const userId = user?.id

  if (!userId || !postId) {
    return json(
      { error: 'invalid form data bad userId or PostId like' },
      { status: 400 }
    )
  }
  try {
    if (request.method === 'POST') {
      await createLike({
        user: {
          connect: {
            id: userId
          }
        },
        post: {
          connect: {
            id: postId
          }
        }
      })
    }

    if (request.method === 'DELETE') {
      await deleteLike({ userId, postId })
    }

    return json({ success: true })
  } catch (error) {
    return json({ error: 'invalid form data like' }, { status: 400 })
  }
}
