import type { LoaderArgs } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import invariant from 'tiny-invariant'
import { isAuthenticated } from '~/models/auth/auth.server'
import { getChildCommentsByParentId } from '~/models/comments.server'
export async function loader({ request, params }: LoaderArgs) {
    const parentId = params.parentId
    invariant(parentId, 'parentId is required')
  const childComments = await getChildCommentsByParentId({ parentId })
  return json({ childComments })
}
