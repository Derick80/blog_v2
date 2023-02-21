import { Avatar, Text, Box, Button, Group, Paper } from '@mantine/core'
import { Link } from '@remix-run/react'
import { format } from 'date-fns'
import { useState } from 'react'
import type { CommentWithChildren } from '~/utils/schemas/comment-schema'
import FormComments from './com-form'

function CommentActions({
  commentId,
  postId
}: {
  postId: string
  commentId: string
}) {
  const [replying, setReplying] = useState(false)

  return (
    <>
      <Group position='apart' mt='md'>
        <Button onClick={() => setReplying(!replying)}>Reply</Button>
      </Group>

      {replying && <FormComments postId={postId} parentId={commentId} />}
    </>
  )
}

function Comment({ comment }: { comment: CommentWithChildren }) {
  return (
    <Paper withBorder radius='md' mb='md' p='md'>
      <Box
        sx={() => ({
          display: 'flex'
        })}
      >
        <Avatar
          component={Link}
          to={`/users/${comment.userId}`}
          src={comment.user.avatarUrl}
        />
        <Box
          pl='md'
          sx={() => ({
            display: 'flex',
            flexDirection: 'column'
          })}
        >
          <Group>
            <Text>{comment.createdBy}</Text>
            <Text>{format(new Date(comment.createdAt), 'MMM d, yyyy')}</Text>
          </Group>

          {comment.message}
        </Box>
      </Box>

      <CommentActions postId={comment.postId} commentId={comment.id} />

      {comment.children && comment.children.length > 0 && (
        <ListComments comments={comment.children} />
      )}
    </Paper>
  )
}

function ListComments({ comments }: { comments: Array<CommentWithChildren> }) {
  return (
    <Box>
      {comments.map((comment) => {
        return <Comment key={comment.id} comment={comment} />
      })}
    </Box>
  )
}

export default ListComments
