import { ActionArgs, json, LoaderArgs } from '@remix-run/node'
import { redirect } from 'react-router'
import invariant from 'tiny-invariant'
import { z } from 'zod'
import { isAuthenticated } from '~/utils/server/auth/auth.server'
import {
  createChildComment,
  createComment,
  getChildCommentsByParentId
} from '~/utils/server/comments.server'
import { validateAction } from '~/utils/utilities'

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

const schema = z.object({
  postId: z.string(),
  parentId: z.string().optional(),
  message: z.string()
})

export type ActionInput = z.infer<typeof schema>

export async function action({ request, params }: ActionArgs) {
  const user = await isAuthenticated(request)
  if (!user) {
    return json({ error: 'Not authenticated' }, { status: 401 })
  }

  const userId = user.id
  const createdBy = user.userName

  const { formData, errors } = await validateAction<ActionInput>({
    request,
    schema
  })

  if (errors) {
    return json({ error: errors }, { status: 400 })
  }

  const { postId, parentId, message } = formData as ActionInput

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
