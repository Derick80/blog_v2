import {
  AvatarIcon,
  ChatBubbleIcon,
  ChevronDownIcon,
  PersonIcon
} from '@radix-ui/react-icons'
import { json } from '@remix-run/node'
import { format } from 'date-fns'
import React from 'react'
import {
  Comment as CommentType,
  CommentWithChildren
} from '~/utils/schemas/comment-schema'
import CommentForm from './comment-form'
import { Box } from '@mantine/core'
function CommentActions({ commentId, userId, postId, createdBy }: { commentId: string, userId: string, postId: string, createdBy: string }) {
  const [replying, setReplying] = React.useState(true)

  return (
    <Box>

    <div className='flex flex-row items-center '>
      <button type='button' onClick={() => setReplying(!replying)}>
        <p className='text-xs'>Reply</p>
        <PersonIcon />
        </button>

      <div>

      {replying ? <CommentForm parentId={commentId}  userId={userId}
      postId={postId} createdBy={createdBy}
      /> : <></>}
      </div>

    </div>
    </Box>
  )
}
function Comment({ comment }: { comment: CommentType }) {
  const users = comment.user
  console.log(users, 'users')

  return (
    <>
      <div
        className='mb-1 mt-2 flex h-fit w-full space-y-2 rounded-xl border-2 p-2 shadow-lg'
        key={comment.id}
      >
        <div className='text w-full'>{comment.message}</div>

        {comment.user?.avatarUrl ? (
          <img
            src={comment.user.avatarUrl}
            alt='avatar'
            className='h-5 w-5 rounded-full'
          />
        ) : null}
        <div className='text-right text-xs'>
          {comment.createdBy && (
            <>
              <p className='italic'>Written by: {comment.createdBy}</p>
            </>
          )}
          {comment.createdAt && (
            <span className='inline-flex space-x-1'>
              {' '}
              <p className='italic'>Posted:</p>{' '}
              <p>{format(new Date(comment.createdAt), 'MMM dd yy')}</p>
            </span>
          )}
          {comment.updatedAt && (
            <p className='italic'>
              Updated: {format(new Date(comment.updatedAt), 'MMM dd yy')}
            </p>
          )}

          <CommentActions commentId={comment.id}  userId={users.id}
            postId={comment.postId}
            createdBy={comment.createdBy}  />
          <CommentForm

            parentId={comment.parentId}
          />
        </div>
      </div>
    </>
  )
}

export default function ListComments({
  comments
}: {
  comments: CommentWithChildren[]
}) {
  const [isOpen, setIsOpen] = React.useState(true)

  return (
    <div className='flex flex-row-reverse'>
      <button type='button' className='' onClick={() => setIsOpen(!isOpen)}>
        {' '}
        <ChatBubbleIcon />
      </button>

      {isOpen ? (
        <div className='flex flex-col space-y-2'>
          {comments.map((comment) => {
            return <Comment comment={comment} key={comment.id} />
          })}
        </div>
      ) : null}
    </div>
  )
}
