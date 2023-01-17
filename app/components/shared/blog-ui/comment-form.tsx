import { Box, Group, Textarea } from '@mantine/core'
import { PaperPlaneIcon } from '@radix-ui/react-icons'
import { Form } from '@remix-run/react'
import { useState } from 'react'
import { CommentWithChildren } from '~/utils/schemas/comment-schema'

type CommentFormProps = {
  parentId?: string | null
  postId?: string
  userId?: string
  createdBy?: string
  comments?: Array<CommentWithChildren>
}

export default function CommentForm({
  userId,
  postId,
  createdBy,
  parentId
}: CommentFormProps) {
  const [formData, setFormData] = useState({
    message: '',
    userId: userId || null || undefined || '',
    postId: postId || null || undefined,
    createdBy: createdBy || null || undefined,
    parentId: parentId || null || undefined
  })

  return (
    <>
      {/* control form list color here */}
      <div className='mt-2 flex w-full flex-col rounded-l-3xl bg-s hover:bg-crimson6'>
        <form
          className='text-black flex w-full flex-row items-center justify-around rounded-lg bg-crimson2 hover:bg-crimson6'
          method='post'
          action='/actions/comment'
        >
          <input type='hidden' name='_action' />
          <input type='hidden' name='userId' value={formData.userId} />
          <input type='hidden' name='postId' value={formData.postId} />
          <input type='hidden' name='createdBy' value={formData.createdBy} />
          <input type='hidden' name='parentId' value={formData.parentId} />
          <textarea
            className='border-bg-crimson6 bg-zinc-200 text-zinc-900 dark:text-black rounded-md border dark:bg-crimson1'
            rows={1}
            cols={50}
            id='message'
            name='message'
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
          />

          {parentId ? (
            <>
              <button
                className='border-transparent inline-flex items-center space-x-1.5 rounded border bg-crimson6 p-2 px-3 py-2 text-sm font-medium leading-4 shadow-sm'
                type='submit'
              >
                <p>Reply</p>
                <PaperPlaneIcon className='-rotate-90 transform' />
              </button>
            </>
          ) : (
            <>
              <button
                className='border-transparent inline-flex items-center space-x-1.5 rounded border bg-crimson6 p-2 px-3 py-2 text-sm font-medium leading-4 shadow-sm'
                type='submit'
              >
                <PaperPlaneIcon />
              </button>
            </>
          )}
        </form>
      </div>
    </>
  )
}
