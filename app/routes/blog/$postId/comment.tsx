import { ActionArgs, json, redirect } from '@remix-run/node'
import { Form, useParams } from '@remix-run/react'
import { useState } from 'react'
import { badRequest } from 'remix-utils'
import CommentForm from '~/components/shared/comment/comment-form'
import { Modal } from '~/components/shared/modal'
import { isAuthenticated } from '~/models/auth/auth.server'
import { flashAndCommit } from '~/models/auth/session.server'
import { createChildComment, createComment } from '~/models/comments.server'
import { validateText } from '~/routes/validators.server'
import { useUser } from '~/utils/utils'

export async function action({ request, params }: ActionArgs) {
  const user = await isAuthenticated(request)
  const postId = params?.postId
  const userId = user?.id
  const createdBy = user?.userName
  const formData = await request.formData()
  const action = formData.get('_action')

  const message = formData.get('message')
  console.log(message)

  if (
    typeof message !== 'string' ||
    typeof userId !== 'string' ||
    typeof postId !== 'string' ||
    typeof createdBy !== 'string' ||
    typeof action !== 'string'
  ) {
    return badRequest({ message: 'Invalid comment' })
  }

  const errors = {
    message: validateText(message),
    userId: validateText(userId),
    postId: validateText(postId),
    createdBy: validateText(createdBy)
  }

  if (Object.values(errors).some(Boolean))
    return json(
      {
        errors,
        fields: {
          message,
          userId,
          postId,
          createdBy
        },
        form: action
      },
      {
        status: 400
      }
    )

  switch (action) {
    case 'create' as string:
      await createComment({ message, userId, postId, createdBy })
      const headers = await flashAndCommit(
        request,
        'Your comment has been added'
      )
      return redirect(`/blog/${postId}`, { headers })

    default:
      return badRequest({ message: 'Invalid action' })
  }
}

export default function Comment() {
  const params = useParams()
  const user = useUser()
  const postId = params.postId
  const [formData, setFormData] = useState({
    userId: user?.id,
    postId: params.postId,
    createdBy: user?.userName,
    message: ''
  })
  return (
    <Modal isOpen={true}>
      <Form method='post'>
        <input
          type='hidden'
          name='userId'
          value={formData.userId}
          onChange={(event) =>
            setFormData({ ...formData, userId: event.target.value })
          }
        />

        <input type='hidden' name='postId' value={formData.postId} />

        <input type='hidden' name='createdBy' value={formData.createdBy} />

        <input
          type='text'
          name='message'
          className='form-field-primary'
          value={formData.message}
          onChange={(event) =>
            setFormData({ ...formData, message: event.target.value })
          }
        />
        <button className='btn' type='submit' name='_action' value='create'>
          Submit
        </button>
      </Form>
    </Modal>
  )
}
