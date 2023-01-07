import {
  AvatarIcon,
  ChatBubbleIcon,
  ChevronDownIcon
} from '@radix-ui/react-icons'
import { json } from '@remix-run/node'
import { format } from 'date-fns'
import React from 'react'
import CommentForm from './comment-form'

function CommentActions({ commentId, replyCount }) {
  const [replying, setReplying] = React.useState(false)

  return (
    <div className='flex items-center justify-between'>
      <p> {replyCount}</p>
      <button onClick={() => setReplying(!replying)}>
        {replying && <CommentForm parentId={commentId} />}
        <></>
      </button>
    </div>
  )
}
function Comment({ comment }: any) {
  const users = comment.user
  console.log(users, 'users')

  return (
    <>
      <div
        className='border-black mb-1 flex flex-col space-y-2 rounded-xl border-2 p-2 shadow-lg'
        key={comment.id}
      >
        <h2 className='text-right'>{comment.message}</h2>
        <CommentForm />

        {comment.user?.avatarUrl ? (
          <div className='relative'>
            <img
              src={comment.user.avatarUrl}
              alt='avatar'
              className='h-5 w-5 rounded-full'
            />
            <p className='text-gray-500 absolute top-0 right-5 text-xs'>
              {comment.createdBy[0]}
            </p>{' '}
            {format(new Date(comment.createdAt), 'MMM dd ')}
            <div></div>
          </div>
        ) : (
          <div className='bg-gray-300 h-10 w-10 rounded-full'>
            <AvatarIcon />
          </div>
        )}
      </div>
    </>
  )
}

export default function ListComments({ comments }: any) {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <div>
      <button type='button' className='' onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? (
          <div className='flex-col items-center'>
            {comments?.map((comment) => {
              return <Comment comment={comment} key={comment.id} />
            })}
          </div>
        ) : (
          <ChatBubbleIcon />
        )}
      </button>
    </div>
  )
}
