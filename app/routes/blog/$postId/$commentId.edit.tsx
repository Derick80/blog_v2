import type { ActionArgs, LoaderArgs } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import React from 'react'
import { badRequest } from 'remix-utils'
import invariant from 'tiny-invariant'
import CommentForm from '~/components/shared/comment/comment-form'
import { Modal } from '~/components/shared/layout/modal'
import { isAuthenticated } from '~/models/auth/auth.server'
import { editPostComment } from '~/models/comments.server'
import { prisma } from '~/models/prisma.server'
import { validateText } from '~/routes/validators.server'

export async function loader({ request, params }: LoaderArgs) {
  const commentId = params?.commentId
  invariant(commentId, 'Invalid comment')
  const comment = await prisma.comment.findUnique({
    where: {
      id: commentId
    }
  })

  return json({ comment })
}

export async function action({ request, params }: ActionArgs) {
  console.log('params', params)
  const user = await isAuthenticated(request)
  const userId = user?.id
  invariant(userId, 'Invalid user')
  const postId = params?.postId
  invariant(postId, 'Invalid post')
  const commentId = params?.commentId

  invariant(commentId, 'Invalid comment')
  const formData = await request.formData()
  const action = formData.get('_action')
  const message = formData.get('message')

  if (
    typeof commentId !== 'string' ||
    typeof action !== 'string' ||
    typeof message !== 'string' ||
    typeof userId !== 'string' ||
    typeof postId !== 'string'
  )
    return badRequest({ message: 'Invalid comment' })

  const formErrors = {
    message: validateText(message),
    commentId: validateText(commentId),
    userId: validateText(userId),
    postId: validateText(postId)
  }
  const fields = {
    message,
    userId,
    postId,
    commentId
  }
  if (Object.values(formErrors).some(Boolean)) {
    return json(
      {
        formErrors,
        fields: {
          ...fields
        },
        form: action
      },
      { status: 400 }
    )
  }

  await editPostComment(fields)
  return redirect('/blog')
}

export default function CommentRoute() {
  const data = useLoaderData<typeof loader>()

  const [formData, setFormData] = React.useState({
    message: data?.comment?.message || '',
    commentId: data?.comment?.id || '',


  })

  return (
    <Modal isOpen={true}>
      <CommentForm />
    </Modal>
  )
}
