import { LoaderArgs, json } from '@remix-run/node'
import invariant from 'tiny-invariant'
import { getCommentById } from '~/models/comments.server'
import { getPostById } from '~/models/post.server'



export async function loader({ params, request }: LoaderArgs) {
  const commentId = params.commentId
  invariant(commentId, 'commentId is required')
  const comment = await getCommentById(commentId)

    return json({ comment })
}


