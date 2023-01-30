import { Box, Button, Group, Textarea } from '@mantine/core'
import { Form } from '@remix-run/react'

export default function FormComments({ postId, parentId }: { postId: string, parentId?: string }) {
  return (
    <Box
      mt='md'
      mb='md'
      sx={{
        maxWidth: '600px'
      }}
    >
      <Form method='post' className='w-full' action={`/actions/comment`}>
        <input type='hidden' name='postId' value={postId} />
        {parentId && <input type='hidden' name='parentId' value={parentId} />
        }
        <Textarea
          required
          name='message'
          placeholder='your comment here'
          label='Comment'
        />

        <Group position='right' mt='md'>
          <Button
            type='submit'
            name='_action'
            value={parentId ? 'reply' : 'create'}
          >
            {parentId ? 'post reply' : 'post comment'}
          </Button>
        </Group>
      </Form>
    </Box>
  )
}
