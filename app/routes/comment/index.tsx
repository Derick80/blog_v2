import { json, LoaderArgs } from '@remix-run/node'
import invariant from 'tiny-invariant'
import { getChildCommentsByParentId } from '~/utils/server/comments.server'

export async function loader({ request, params }: LoaderArgs) {
  const parentId = params.parentId
  invariant(parentId, 'parentId is required')
  const comments = await getChildCommentsByParentId({ parentId })

  return json({ comments })
}
