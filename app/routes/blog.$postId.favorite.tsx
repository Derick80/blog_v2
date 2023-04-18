import type { ActionArgs, LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { isAuthenticated } from '~/utils/server/auth/auth.server'
import { createFavorite, deleteFavorite } from '~/utils/server/favorite.server'
// or cloudflare/deno

export async function loader({ request, params }: LoaderArgs) {
  throw new Response("This page doesn't exists.", { status: 404 })
}

export async function action({ request, params }: ActionArgs) {
  const user = await isAuthenticated(request)
  const postId = params.postId
  const userId = user?.id

  if (!userId || !postId) {
    return json(
      { error: 'invalid form data bad userId or PostId fav' },
      { status: 400 }
    )
  }

  try {
    if (request.method === 'POST') {
      await createFavorite({
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
      await deleteFavorite({ userId, postId })
    }

    return json({ success: true })
  } catch (error) {
    return json({ error: 'invalid form data fav' }, { status: 400 })
  }
}
