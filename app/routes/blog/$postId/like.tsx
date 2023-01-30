import type { ActionFunction, LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import invariant from 'tiny-invariant'
import { isAuthenticated } from '~/utils/server/auth/auth.server'
import { createLike, deleteLike } from '~/utils/server/likes.server'

export const loader: LoaderFunction = () => {
  throw new Response("This page doesn't exists.", { status: 404 })
}

export const action: ActionFunction = async ({ request, params }) => {
  const user = await isAuthenticated(request)
  invariant(user, 'need  user')
  const postId = params.postId
  const userId = user.id
  console.log(userId, 'userId')

  console.log(params, 'params')

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
