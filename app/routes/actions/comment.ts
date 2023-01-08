import { ActionArgs, json } from '@remix-run/node'
import { redirect } from 'react-router'
import { isAuthenticated } from '~/models/auth/auth.server'
import { createChildComment, createComment } from '~/models/comments.server'

export async function action({ request, params }: ActionArgs) {
  const user = await isAuthenticated(request)
  if (!user) {
    return json({ error: 'Not authenticated' }, { status: 401 })
  }

  const formData = await request.formData()
  const action = formData.get('_action')

  const postId = formData.get('postId')
  const parentId = formData.get('parentId')
  const message = formData.get('message')
  const userId = formData.get('userId')
  const createdBy = formData.get('createdBy')

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
