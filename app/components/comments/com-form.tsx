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
    <Box
      mt='md'
      mb='md'
      sx={{
        maxWidth: '600px'
      }}
    >
      <commentForm.Form
        ref={formRef}
        method='post'
        className='w-full'
        action={`/actions/comment`}
      >
        <input type='hidden' name='postId' value={postId} />
        {parentId && <input type='hidden' name='parentId' value={parentId} />}
        <Textarea
          required
          name='message'
          placeholder='Write your comment here....'
          label='Comment'
        />

        <Group position='right' mt='md'>
          <Button
            type='submit'
            name='_action'
            variant='default'
            size='sm'
            value={parentId ? 'Reply' : 'Create'}
          >
            {parentId ? 'Post reply' : 'Post a comment'}
          </Button>
        </Group>
      </commentForm.Form>
    </Box>
  )
}
