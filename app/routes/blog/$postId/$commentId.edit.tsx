import { LoaderArgs, json } from '@remix-run/node'
import invariant from 'tiny-invariant'
import { getCommentById } from '~/utils/server/comments.server'
import { getPostById } from '~/utils/server/post.server'

export async function loader({ params, request }: LoaderArgs) {
  const commentId = params.commentId
  invariant(commentId, 'commentId is required')
  const comment = await getCommentById(commentId)

  return json({ comment })
}
