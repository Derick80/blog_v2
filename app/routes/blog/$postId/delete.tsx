

import { ActionArgs, LoaderArgs, redirect } from '@remix-run/node'
import { badRequest } from 'remix-utils'
import { deleteComment } from '~/models/comments.server'
import { deletePost } from '~/models/post.server'

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
