import { PaperPlaneIcon } from '@radix-ui/react-icons'
import { Form } from '@remix-run/react'
import { useState } from 'react'

type CommentFormProps = {
  parentId?: string | null
  postId?: string
  userId?: string
  createdBy?: string
}

export default function CommentForm({
  userId,
  postId,
  createdBy,
  parentId
}: CommentFormProps) {
  const [formData, setFormData] = useState({
    message: '',
    userId: userId || null || undefined,
    postId: postId || null || undefined,
    createdBy: createdBy || null || undefined,
    parentId: parentId || null || undefined
  })
  console.log(parentId, 'parentId')

  return (
    <>
      <div className=''>
        <form
          className='text-black border-bg-crimson6 flex w-full flex-row items-center justify-center rounded-lg'
          method='post'
          action='/actions/comment'
        >
          <input type='hidden' name='_action' />
          <input type='hidden' name='userId' value={formData.userId} />
          <input type='hidden' name='postId' value={formData.postId} />
          <input type='hidden' name='createdBy' value={formData.createdBy} />
          <input type='hidden' name='parentId' value={formData.parentId} />
          <textarea
            className='border-bg-crimson6 bg-zinc-200 text-zinc-900 dark:text-black w-full rounded-md border dark:bg-crimson1'
            rows={1}
            cols={50}
            id='message'
            name='message'
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
          />

          <div className='flex flex-row items-center justify-end'>
            {parentId ? (
              <>
                <button
                  className='text-white flex items-center space-x-2 rounded-lg bg-crimson6 p-2'
                  type='submit'
                >
                  <p>Reply</p>
                  <PaperPlaneIcon className='-rotate-90 transform' />
                </button>
              </>
            ) : (
              <>
                <button
                  className='text-white flex items-center space-x-2 rounded-lg bg-crimson6 p-2'
                  type='submit'
                >
                  <p>Comment</p>
                  <PaperPlaneIcon />
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </>
  )
}
