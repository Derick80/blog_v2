import { Form, useParams } from '@remix-run/react'
import { useRef, useState } from 'react'
import { useOptionalUser } from '~/utils/utils'

export type CommentFormProps = {
  postId?: string
  action?: string
}

export default function CommentForm({ postId, action }: CommentFormProps) {
  const user = useOptionalUser()
  const params = useParams()
  console.log('params', params)

  const commentFormRef = useRef<HTMLFormElement>(null)

  const [formData, setFormData] = useState({
    userId: user?.id,
    postId: postId,
    createdBy: user?.userName,
    message: ''
  })

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormData(formData)
  }

  return (
    <Form method='post' ref={commentFormRef} action={`${postId}/${action}`}>
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
  )
}
