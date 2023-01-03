import { useState } from 'react'
import { Form } from 'react-router-dom'
import { useOptionalUser } from '~/utils/utils'
import { iconAttrs } from '../icons'
import LinkMaker from '../layout/link-maker'

export type CommentActionBoxProps = {
  commentId: string
  postId: string
}

export default function CommentActionBox({
  commentId,
  postId
}: CommentActionBoxProps) {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <>
      <button
        type='button'
        className='rounded-lg p-2 text-zinc-900 transition  dark:text-slate-200 dark:hover:bg-slate-500'
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <span className='material-icons'>expand_more</span>
        ) : (
          <>
            <span className='material-icons'>expand_less</span>
            <div className='flex flex-row gap-4'>
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
          </>
        )}
      </button>
    </>
  )
}
