import { Form, useParams } from '@remix-run/react'
import { useState } from 'react'
import { useMatchesData, useOptionalUser } from '~/utils/utils'
import CommentActionBox from './comment-actions'

export default function CommentForm() {
  const user = useOptionalUser()
  const matches = useMatchesData('commentId')
  console.log('matches', matches)

  const params = useParams()
  console.log('params', params.commentId)

  const [formData, setFormData] = useState({
    message: '',
    commentId: matches?.commentId,
    postId: params.postId
  })

  return (
    <>
      <Form className='flex w-full flex-col gap-8'>
        <input type='hidden' name='userId' value={user?.id} />
        <input type='hidden' name='commentId' value={params.commentId} />
        <input type='hidden' name='postId' value={params.postId} />
        <label htmlFor='message'>Message</label>
        <input
          placeholder='write your comment here...'
          id='message'
          className='rounded-md border border-gray-300 bg-slate-200 text-zinc-900 dark:bg-zinc-600 dark:text-slate-200'
          name='message'
          type='text'
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
        />
        <button type='submit'>Submit</button>
      </Form>
      <div>
        {user ? (
          <>
            <CommentActionBox
              commentId={params.commentId}
              postId={params.postId}
            />
          </>
        ) : (
          <>
            <p>Sign up or Register to comment, share, and like posts</p>
          </>
        )}
      </div>
    </>
  )
}
