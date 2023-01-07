import { json, LoaderArgs } from '@remix-run/node'
import invariant from 'tiny-invariant'
import { getRootCommentsByPostId } from '~/models/comments.server'

export async function loader({ request, params }: LoaderArgs) {
  const postId = params.postId
  invariant(postId, 'postId is required')
  const comments = await getRootCommentsByPostId({ postId })

  return json({ comments })
}
