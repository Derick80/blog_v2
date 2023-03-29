import type { ActionArgs, LoaderArgs } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { badRequest } from 'remix-utils'
import { deleteComment } from '~/utils/server/comments.server'
import { deletePost } from '~/utils/server/post.server'
import type { MetaFunction } from '@remix-run/node' // or cloudflare/deno

// This is the route that handles deleting a post or comment
export const meta: MetaFunction = () => {
  return {
    title: 'Delete a post or comment',
    description: "Delete a post or comment on Derick's blog"
  }
}
export async function action({ request, params }: ActionArgs) {
  const id = params?.id
  const formData = await request.formData()

  const action = formData.get('_action')
  if (typeof id !== 'string' || typeof action !== 'string')
    return badRequest({ message: 'Invalid id' })

  switch (action) {
    case 'delete':
      await deletePost(id)
      return redirect('/blog')
    case 'deleteComment':
      await deleteComment(id)
      return redirect('/blog')
  }
}

export async function loader({ request, params }: LoaderArgs) {
  throw new Response("This page doesn't exists.", { status: 404 })
}
