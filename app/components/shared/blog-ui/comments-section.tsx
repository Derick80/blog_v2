import { ChatBubbleIcon } from '@radix-ui/react-icons'
import { IconMessage2 } from '@tabler/icons'
import React from 'react'
import type { CommentWithChildren } from '~/utils/schemas/comment-schema'
import { useOptionalUser } from '~/utils/utilities'
import { Button } from '../button'
import CommentForm from './comment-form'
import formatComments from './format-comments'
import ListComments from './list-comments'

type CommentSectionProps = {
  comments?: Array<CommentWithChildren>
  postComments?: number
  postId: string
}
export function CommentSection({
  comments,
  postComments,
  postId
}: CommentSectionProps) {
  const [isOpen, setIsOpen] = React.useState(true)

  return (
    <div className='flex flex-row-reverse'>
      <Button onClick={() => setIsOpen(!isOpen)}>
        <div className='flex flex-row '>
          <IconMessage2 stroke={1.5} size={20} />
          <p className='pt-3 text-xs'>{postComments}</p>
        </div>
      </Button>

      {isOpen && (
        <div className='flex w-full flex-col'>
          <CommentForm postId={postId} />
          {comments && comments.length > 0 && (
            <ListComments comments={formatComments(comments)} />
          )}
        </div>
      )}
    </div>
  )
}
