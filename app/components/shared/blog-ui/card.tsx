import { Form, Link, useFetcher } from '@remix-run/react'
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
    imageUrl: string
    avatarUrl: string
  }
}

export const Card = ({ results }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const fetcher = useFetcher()
  const [formData, setFormData] = useState({
    message: ''
  })
  return (
    <>
      <div key={results.postId} className='max-w-prose p-2 shadow-2xl rounded-lg hover:ring-1 ring-indigo-300 dark:hover:ring-gray-400'>
       <div
          className='flex flex-row items-center justify-between'
       > <h1 className='mh2'>{results.title}</h1>
      <Link className='hover:animate-pulse' to={`/users/${results.userId}`}>
      <img
                  src={results.avatarUrl}
                  alt='avatar'
                  className='h-10 w-10 rounded-full'
                  style={{ height: '50px', width: '50px', objectFit: 'cover', minWidth: '50px' }}
                />
                </Link>
       </div>


            <img src={results.imageUrl} alt='avatar' className='float-left h-10 w-10 mt-5 mb-5 rounded-full'
            style={{ height: '250px', width: '250px', objectFit: 'cover' }}
            />


        <div className='flex flex-row mt-10 pl-2 italic'>{results.description}</div>
        <div className='float-right flex flex-row mt-10 pl-2 italic'><p>Published: </p>{format(new Date(results.createdAt), 'MMM dd ')}
          </div>
        <div className='float-right flex flex-row mt-10 pl-2 italic'><p>Written by: </p>{results.userName}</div>

        <div className='text-base clear-left indent-6'>{results.body}</div>
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
      <div key={results.id} className='m-5 border-2 rounded-sm border-black/20 hover:ring-2 ring-indigo-300 dark:hover:ring-gray-400'>
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
                  className='h-5 w-5 rounded-full'
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
