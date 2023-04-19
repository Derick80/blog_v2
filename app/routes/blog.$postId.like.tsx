import type {
  ActionFunction,
  LoaderArgs} from '@remix-run/node'
import { json } from '@remix-run/node'
import invariant from 'tiny-invariant'
import { isAuthenticated } from '~/utils/server/auth/auth.server'
import { createLike, deleteLike } from '~/utils/server/likes.server'

// or cloudflare/deno
import { getPostById } from '~/utils/server/post.server'

export async function loader({ request, params }: LoaderArgs) {
  const user = await isAuthenticated(request)

  if (!user) {
    throw new Error('You need to be authenticated to like a post')
  }
  const postId = params.postId
  if (!postId) {
    throw new Error('You need to provide a postId to like a post')
  }

  const posts = await getPostById(postId)
  if (!posts) {
    throw new Error('Post not found')
  }

  const likes = posts.likes.map((like) => like)

  return json({ likes })
}

export const action: ActionFunction = async ({ request, params }) => {
  const user = await isAuthenticated(request)
  invariant(user, 'need  user')
  const postId = params.postId
  const userId = user.id

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
