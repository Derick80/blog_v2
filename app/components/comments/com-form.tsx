import { Box, Button, Group, Textarea } from '@mantine/core'
import { useFetcher } from '@remix-run/react'
import React, { useEffect } from 'react'

export default function FormComments({
  postId,
  parentId
}: {
  postId: string
  parentId?: string
}) {
  const commentForm = useFetcher()
  // use the next few lines to reset the comment form without user navigating away from the page

  let formRef = React.useRef<HTMLFormElement>(null)
  useEffect(() => {
    if (commentForm.type === 'done') {
      formRef.current?.reset()
    }
  }, [commentForm.type])
  return (
    <div className='w-auto'>
      {/* send to actions/comment to leave a comment */}
      <commentForm.Form
        ref={formRef}
        method='post'
        className='w-full'
        action={`/actions/comment`}
      >
        <input type='hidden' name='postId' value={postId} />
        {parentId && <input type='hidden' name='parentId' value={parentId} />}
        <textarea
          required
          name='message'
          placeholder='Write your comment here....'
          className='w-full rounded-md border border-gray-300 p-2 text-black'
        />

        <Button
          type='submit'
          name='_action'
          variant='filled'
          size='sm'
          value={parentId ? 'Reply' : 'Create'}
        >
          {parentId ? 'Post reply' : 'Post a comment'}
        </Button>
      </commentForm.Form>
    </div>
  )
}
