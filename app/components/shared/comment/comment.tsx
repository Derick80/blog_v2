import { format } from 'date-fns'
import { useState } from 'react'
import { useOptionalUser } from '~/utils/utils'
import CommentForm from './comment-form'

export type CommentProps = {
  comment: {
    id: string
    message: string
    createdBy: string
    createdAt: string
    parentId?: string
  }
}

export default function Comment({ comment }: CommentProps) {
  console.log('comment', comment)

  const currentUser = useOptionalUser()
  const [isReplying, setIsReplying] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  return (
    <>
      <div
        key={comment.id}
        className='mt-1 mb-1 flex w-full flex-col rounded-3xl p-1 shadow-xl md:p-2'
      >
        <div className='relative flex flex-row items-center space-x-2'>
          {currentUser && (
            <>
              <img
                src={currentUser.avatarUrl}
                alt={comment.createdBy}
                className='h-10 w-10 rounded-full'
              />
              <span className='text-sm text-gray-500'>{comment.message}</span>
            </>
          )}

          <span className='text-sm text-gray-500'>
            <span className='date'></span>
          </span>
        </div>
        <div>
          <p>{comment.message}</p>
        </div>
        {currentUser && (
          <div>
            <button onClick={() => setIsReplying(!isReplying)}>Reply</button>
          </div>
        )}
        {isReplying && (
          <div>
            <CommentForm action='reply' postId={comment.id} />
          </div>
        )}
      </div>
    </>
  )
}
