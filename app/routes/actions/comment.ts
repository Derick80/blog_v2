import { ActionArgs, json, LoaderArgs } from '@remix-run/node'
import { redirect } from 'react-router'
import invariant from 'tiny-invariant'
import { isAuthenticated } from '~/utils/server/auth/auth.server'
import {
  createChildComment,
  createComment,
  getChildCommentsByParentId
} from '~/utils/server/comments.server'

export async function loader({ request, params }: LoaderArgs) {
  const user = await isAuthenticated(request)
  if (!user) {
    return json({ error: 'Not authenticated' }, { status: 401 })
  }

  const parentId = params.parentId
  invariant(parentId, 'parentId is required')
  const comments = await getChildCommentsByParentId({ parentId })
  return json({ comments })
}
export async function action({ request, params }: ActionArgs) {
  const user = await isAuthenticated(request)
  if (!user) {
    return json({ error: 'Not authenticated' }, { status: 401 })
  }

  const userId = user.id
  const createdBy = user.userName

  const formData = await request.formData()
  const postId = formData.get('postId')
  const parentId = formData.get('parentId')
  const message = formData.get('message')

  if (
    typeof postId !== 'string' ||
    typeof message !== 'string' ||
    typeof userId !== 'string' ||
    typeof createdBy !== 'string'
  ) {
    return json({ error: 'Invalid form data' }, { status: 400 })
  }

  if (!parentId) {
    await createComment({
      message,
      userId,
      postId,
      createdBy
    })
    return redirect(`/blog/${postId}`)
  } else if (parentId) {
    await createChildComment({
      message,
      userId,
      postId,
      createdBy,
      parentId: parentId?.toString()
    })
    return redirect(`/blog/${postId}`)
  } else {
    return json({ error: 'Invalid form data' }, { status: 400 })
  }
}
