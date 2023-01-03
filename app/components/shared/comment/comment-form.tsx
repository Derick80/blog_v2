import { useParams } from '@remix-run/react'
import { useState } from 'react'
import { useMatchesData } from '~/utils/utils'

export default function CommentForm() {
  const matches = useMatchesData('commentId')
  console.log('matches', matches)

  const params = useParams()
  console.log('params', params.commentId)

  const [formData, setFormData] = useState({
    message: '',
    commentId: matches?.commentId
  })

  return (
    <form className='flex flex-col space-y-2'>
      form
      <input type='hidden' name='commentId' value={params.commentId} />
      <label htmlFor='message'>Message</label>
      <textarea
        id='message'
        className='rounded-md border border-gray-300 bg-slate-200 text-zinc-900 dark:bg-zinc-600 dark:text-slate-200'
        name='message'
        rows={3}
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
      />
      <button type='submit'>Submit</button>
    </form>
  )
}
