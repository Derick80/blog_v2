import { Box } from '@mantine/core'
import { ChatBubbleIcon } from '@radix-ui/react-icons'
import React from 'react'
import type { CommentWithChildren } from '~/utils/schemas/comment-schema'
import CommentForm from './comment-form'
import formatComments from './format-comments'
import ListComments from './list-comments'

type CommentSectionProps = {
  comments?: Array<CommentWithChildren>
  postComments?: number
}
export function CommentSection({
  comments,
  postComments
}: CommentSectionProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const comment = comments.map((comment) => comment)

  return (
    <div
    className='bg-crimson2'
    >
      <CommentForm comments={formatComments(comments || [])} />

      <div className='mt-2 flex w-full flex-row justify-end'>
        <button
          className='border-transparent inline-flex items-center space-x-1.5 rounded border bg-crimson6 p-2 px-3 py-2 text-sm font-medium leading-4 shadow-sm'
          type='button'
          onClick={() => setIsOpen(!isOpen)}
        >

          <ChatBubbleIcon />
          <div className='flex flex-col'>
            <p className='text-xs'>{postComments}</p>
          </div>
        </button>
      </div>

      {isOpen ? (
        <ListComments comments={formatComments(comments || [])} />
      ) : null}
    </div>
  )
}
