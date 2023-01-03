import { ActionArgs, json, redirect } from '@remix-run/node'
import { badRequest } from 'remix-utils'
import { isAuthenticated } from '~/models/auth/auth.server'
import { flashAndCommit } from '~/models/auth/session.server'
import { createChildComment } from '~/models/comments.server'
import { validateText } from '~/routes/validators.server'

export async function action({ request, params }: ActionArgs) {
  const user = await isAuthenticated(request)
  const userId = user?.id
  const createdBy = user?.userName
  const postId = params?.postId
  const commentId = params?.commentId
  const formData = await request.formData()
  const action = formData.get('_action')
  const message = formData.get('message')
  console.log(message)
  console.log(postId)
  console.log(commentId)
  console.log(action)

  if (
    typeof message !== 'string' ||
    typeof postId !== 'string' ||
    typeof commentId !== 'string' ||
    typeof action !== 'string' ||
    typeof createdBy !== 'string' ||
    typeof userId !== 'string'
  ) {
    return badRequest({ message: 'Invalid comment' })
  }

  const errors = {
    message: validateText(message),
    postId: validateText(postId),
    commentId: validateText(commentId)
  }

  if (Object.values(errors).some(Boolean))
    return json(
      {
        errors,
        fields: {
          message,
          postId,
          commentId,
          action,
          createdBy: user?.userName
        },
        form: action
      },
      {
        status: 400
      }
    )

  switch (action) {
    case 'reply' as string:
      await createChildComment({
        message,
        postId,
        commentId,
        createdBy,
        userId
      })
      const headers = await flashAndCommit(
        request,
        `  Comment created successfully`
      )
      return redirect(`/blog/`, { headers })

    default:
      return badRequest({ message: 'Invalid action' })
  }
}
