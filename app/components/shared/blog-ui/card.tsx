import { Form, useFetcher } from '@remix-run/react'
import { format } from 'date-fns'
import { useState } from 'react'
import CommentActionBox from '../comment/comment-actions'
import { UserPlaceHolder } from '../icons'

export type Props = {
  results: {
    postId: string
    title: string
    body: string
    message: string
    id: string
    comment: string
    createdAt: string
    updatedAt: string
    published: boolean
    userId: string
    userName: string
    description: string
    email: string
    avatarUrl: string
  }
}

export const Card = ({ results }: Props) => {
  const [isOpen, setIsOpen] = useState(true)
  const fetcher = useFetcher()
  const [formData, setFormData] = useState({
    message: ''
  })
  return (
    <>
      <div key={results.postId} className='max-w-prose p-2 shadow-2xl'>
        <div className='flex flex-row'>{results.description}</div>
        <div className='flex flex-row items-center justify-end space-x-2'>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className='flex flex-row space-x-2'
          >
            <span className='material-icons'>comment</span>
            {isOpen ? 'Close' : 'Comment'}
          </button>
        </div>
        {isOpen && (
          <div className='rounded-lg'>
            <fetcher.Form
              method='post'
              action={`/blog/${results.id}/comment`}
              className='flex flex-col items-end space-y-1'
            >
              <textarea
                rows={1}
                cols={50}
                id='message'
                className='w-full rounded-md border border-blue-300 bg-zinc-200 text-zinc-900 dark:bg-zinc-400 dark:text-slate-200'
                name='message'
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
              />
              <button
                className='btn-base btn-solid-success w-fit'
                type='submit'
              >
                Save
                <span className='material-icons'>save</span>
              </button>
            </fetcher.Form>
          </div>
        )}
        <CommentCard results={results} />
      </div>
    </>
  )
}

function CommentCard({ results }: Props) {
  return (
    <>
      <div key={results.id} className=''>
        <div className='flex flex-col place-items-start'>
          <div className='pl-4 indent-4'>{results.message}</div>
        </div>
        <div className='flex flex-col justify-between'>
          <div className='flex flex-row items-center justify-end space-x-2'>
            {results.avatarUrl ? (
              <>
                <img
                  src={results.avatarUrl}
                  alt='avatar'
                  className='h-10 w-10 rounded-full'
                />
                <div>
                  {' '}
                  {results.userName}{' '}
                  {format(new Date(results.createdAt), 'MMM dd ')}
                </div>
                <div></div>
              </>
            ) : (
              <div className='h-10 w-10 rounded-full bg-gray-300'>
                <UserPlaceHolder />
              </div>
            )}
            <Form
              method='post'
              action={`/blog/${results.postId}/${results.id}/delete`}
            >
              <button type='submit' className='flex flex-row gap-2'>
                <span className='material-icons'>delete</span>
              </button>
            </Form>
            <CommentActionBox postId={results.postId} commentId={results.id} />
          </div>
        </div>
      </div>
    </>
  )
}
