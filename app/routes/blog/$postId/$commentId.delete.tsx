import { ActionArgs, LoaderArgs, redirect } from '@remix-run/node'
import { badRequest } from 'remix-utils'
import { deleteComment } from '~/utils/server/comments.server'

export async function action({ request, params }: ActionArgs) {
  const commentId = params?.commentId

  if (typeof commentId !== 'string')
    return badRequest({ message: 'Invalid comment' })

  await deleteComment(commentId)
  return redirect('/blog')
}

export async function loader({ request, params }: LoaderArgs) {
  throw new Response("This page doesn't exists.", { status: 404 })
}
