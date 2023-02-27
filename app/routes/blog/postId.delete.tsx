import type { ActionArgs, LoaderArgs } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { badRequest } from 'remix-utils'
import { deletePost } from '~/utils/server/post.server'

export async function action({ request, params }: ActionArgs) {
  const postId = params?.postId

  if (typeof postId !== 'string')
    return badRequest({ message: 'Invalid PostId' })

  await deletePost(postId)
  return redirect('/blog')
}

export async function loader({ request, params }: LoaderArgs) {
  throw new Response("This page doesn't exists.", { status: 404 })
}
