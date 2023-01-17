import { Box, Button as Btn, Textarea, TextInput } from '@mantine/core'
import { PaperPlaneIcon } from '@radix-ui/react-icons'
import { Form } from '@remix-run/react'
import { IconSend } from '@tabler/icons'
import { useState } from 'react'
import { CommentWithChildren } from '~/utils/schemas/comment-schema'
import { Button } from '../button'

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
    <Box>
      {/* control form list color here */}

      <form
        className='grow rounded-xl border-2 p-2'
        method='post'
        action='/actions/comment'
      >
        <input type='hidden' name='_action' />
        <input type='hidden' name='userId' value={formData.userId} />
        <input type='hidden' name='postId' value={formData.postId} />
        <input type='hidden' name='createdBy' value={formData.createdBy} />
        <input type='hidden' name='parentId' value={formData.parentId} />
        <div className='flex flex-row items-center space-x-2 p-2'>
          <Textarea
            autosize={true}
            label='Comment'
            radius='md'
            id='message'
            name='message'
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
          />
          <button className='flex items-center space-x-2' type='submit'>
            <IconSend stroke={1.5} size={20} />
            {parentId ? (
              <p className='text-xs'>Reply</p>
            ) : (
              <p className='text-xs'>Comment</p>
            )}
          </button>
        </div>
      </form>
    </Box>
  )
}
