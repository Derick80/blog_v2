import type { ActionArgs, LoaderArgs } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { badRequest } from 'remix-utils'
import {
  deletePost,
  publishPost,
  unPublishPost
} from '~/utils/server/post.server'

export async function action({ request, params }: ActionArgs) {
  const postId = params?.postId
  console.log(postId,'postId');

  const formData = await request.formData()

  const action = formData.get('_action')
  console.log(action, 'action')

  if (typeof postId !== 'string')
    return badRequest({ message: 'Invalid PostId' })

  switch (action) {
    case 'publish':
      await publishPost(postId)
      return redirect(`/blog`)

    case 'unpublish':
      await unPublishPost(postId)
      return redirect(`/blog/${postId}`)

    case 'delete':
      await deletePost(postId)
      return redirect(`/blog`)

    default:
      return badRequest({ message: 'Invalid Action' })
  }
}

export async function loader({ request, params }: LoaderArgs) {
  throw new Response("This page doesn't exists.", { status: 404 })
}
