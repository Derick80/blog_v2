import React from 'react'
import type { CommentWithChildren } from '~/utils/schemas/comment-schema'
import CommentForm from './comment-form'
import { Pencil1Icon, TrashIcon } from '@radix-ui/react-icons'
import { Form } from '@remix-run/react'
import { NavLink } from 'react-router-dom'
import PostUserInfo from './avatar-circle'
import { IconArrowBearLeft, IconTrash } from '@tabler/icons'
import { Group, Button, Avatar, Box, Paper, Text } from '@mantine/core'
import { format } from 'date-fns'

function CommentActions({
  commentId,
  userId,
  postId,
  createdBy,
  replyCount
}: {
  commentId: string
  userId: string
  postId: string
  createdBy: string
  replyCount: number
}) {
  const [replying, setReplying] = React.useState(false)

  return (
    <Group position='apart' mt='md'>

      <div className=' '>
        {replying ? (
          <>
              <Button onClick={ () => setReplying(!replying) }>
                { ' ' }
                <IconArrowBearLeft stroke={ 1.5 } size={ 20 } />
                <p className='text-xs'>Reply</p>
              </Button>
              <Form action={ `/blog/${postId}/${commentId}/delete` } method='post'>
                <button type='submit' className=''>
                  <IconTrash stroke={ 1.5 } size={ 20 } />
                  <p className='text-xs'>Delete</p>
                </button>
              </Form>

        </>
        ) : null }
      </div>

    </Group>
  )
}

function Comment({ comment }: { comment: CommentWithChildren }) {

  return (
    <>
     <Paper withBorder radius="md" mb="md" p="md">


        <div
        className='flex flex-row items-center space-x-2 p-2'
        >
 <div
 className='flex flex-col'>
            <div>
            {comment.user.avatarUrl ? (
        <img
              src={ comment.user.avatarUrl }
              alt={ comment.user.userName }
              className='h-6 w-6 rounded-full'
              style={ { width: '1.5rem', height: '1.5rem' } } />



      ) : null}
  <Text>{ comment.user.userName }</Text><Text>{ format(new Date(comment.createdAt), 'MMM dd,') }</Text>
            </div>
          </div>
          {comment.message}
          </div>

      <CommentActions
        userId={comment.user.id}
        postId={comment.postId}
        createdBy={comment.createdBy}

        commentId={comment.id}
        replyCount={comment.children.length}
      />

      {comment.children && comment.children.length > 0 && (
        <ListComments comments={comment.children} />
      )}
    </Paper>
    </>
  )
}
function ListComments({ comments }: { comments: Array<CommentWithChildren> }) {
  return (
    <Box
    >
      {comments.map((comment) => {
        return <Comment key={comment.id} comment={comment} />
      })}
    </Box>
  )
}

export default ListComments
