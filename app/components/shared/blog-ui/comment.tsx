import { IconBrandGooglePlay, IconHeart } from '@tabler/icons'
import { format } from 'date-fns'
import { useState } from 'react'
import { useRouteData } from 'remix-utils'
import { User } from '~/utils/schemas/user-schema'
import { CommentForm } from './commentForm'
import { CommentList } from './commentList'

export default function Comment({
  id,
  message,
  user,
  createdAt
}: {
  id: string
  message: string
  user: User
  createdAt: string
}) {
  const [isReplying, setIsReplying] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const commentsByParentId = useRouteData('/blog/commentsByParentId')
  // console.log(commentsByParentId, 'commentsByParentId');

  function getReplies(parentId: string) {
    return commentsByParentId[parentId]
  }

  const childComments = getReplies(id)
  console.log(childComments, 'childComments')
  const [areChildrenHidden, setAreChildrenHidden] = useState(false)

  return (
    <>
      <div className='flex flex-row space-x-2'>
        <div className='flex flex-col space-y-2'>
          <span className='text-xs'>{user.userName}</span>
          <span className='text-xs'>
            {format(new Date(createdAt), 'MMM dd,')}
          </span>
        </div>
        <div className='flex flex-col space-y-2'>
          {isEditing ? (
            <CommentForm autoFocus initialValue={message} />
          ) : (
            <div className='message'>{message}</div>
          )}
          <div className='flex flex-row space-x-2'>
            <button className='text-xs'>
              <IconBrandGooglePlay />
              reply
            </button>
            <button className='text-xs'>
              <IconHeart />
              like
            </button>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className='text-xs'
            >
              collapse
            </button>
          </div>
        </div>
      </div>
      {isReplying && (
        <div className='mt-1 ml-3'>
          <CommentForm autoFocus />
        </div>
      )}
      {childComments?.length > 0 && (
        <>
          <div
            className={`nested-comments-stack ${
              areChildrenHidden ? 'hide' : ''
            }`}
          >
            <button
              className='collapse-line'
              aria-label='Hide Replies'
              onClick={() => setAreChildrenHidden(true)}
            />
            <div className='nested-comments'>
              <CommentList comments={childComments} />
            </div>
          </div>
          <button
            className={`btn mt-1 ${!areChildrenHidden ? 'hide' : ''}`}
            onClick={() => setAreChildrenHidden(false)}
          >
            Show Replies
          </button>
        </>
      )}
    </>
  )
}
