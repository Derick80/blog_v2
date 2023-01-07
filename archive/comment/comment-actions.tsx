import { ChatBubbleIcon } from '@radix-ui/react-icons'
import { useState } from 'react'
import LinkMaker from '../layout/link-maker'

export type CommentActionBoxProps = {
  commentId: string
  postId: string
}

export default function CommentActionBox({
  commentId,
  postId
}: CommentActionBoxProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        type='button'
        className='text-zinc-900 dark:text-slate-200 dark:hover:bg-slate-500 rounded-lg  p-2 transition'
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <div className='flex flex-col items-center'>
            <ChatBubbleIcon />
            <div className='flex flex-col items-center gap-4'>
              <LinkMaker
                link={{
                  name: 'Edit',
                  href: `/blog/${postId}/${commentId}/edit`,
                  icon_name: 'edit'
                }}
              />

              <LinkMaker
                link={{
                  name: 'Reply',
                  href: `/blog/${postId}/${commentId}/reply`,
                  icon_name: 'reply'
                }}
              />
            </div>
          </div>
        ) : (
          <>
            <ChatBubbleIcon />
          </>
        )}
      </button>
    </>
  )
}
