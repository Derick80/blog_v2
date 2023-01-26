import React from 'react'
import type { CommentWithChildren } from '~/utils/schemas/comment-schema'
import CommentForm from './comment-form'
import { Pencil1Icon, TrashIcon } from '@radix-ui/react-icons'
import { Form } from '@remix-run/react'
import { NavLink } from 'react-router-dom'
import PostUserInfo from './avatar-circle'
import {
  IconArrowBadgeRight,
  IconArrowBearLeft,
  IconArrowRight,
  IconChevronDownRight,
  IconCircleChevronRight,
  IconTrash
} from '@tabler/icons'
import { Group, Button, Avatar, Box, Paper, Text } from '@mantine/core'
import { format } from 'date-fns'

function CommentActions({
  commentId,
  postId,
  replyCount
}: {
  commentId: string
  postId: string
  replyCount: number
}) {
  const [replying, setReplying] = React.useState(false)

  return (
    <div className='flex flex-row items-center justify-between space-x-2 p-2'>

      {replying ? (
        <>
          <CommentForm postId={postId} parentId={commentId} />

          <Form action={`/blog/${postId}/${commentId}/delete`} method='post'>
            <button type='submit' className=''>
              <IconTrash />
              <p className='text-xs'>Delete</p>
            </button>
          </Form>
        </>
      ) : null}
      <Button onClick={() => setReplying(!replying)}>
        {' '}
        <IconCircleChevronRight />
        <p className='text-xs'>Reply</p>
      </Button>
    </div>
  )
}

function Comment({ comment }: { comment: CommentWithChildren }) {
  return (
    <>
      <div className='flex relative flex-row items-center justify-between space-x-2 p-0'>
        {comment.parentId ? (
        <div className='ml-4 flex'>
         <IconArrowBadgeRight />
         <p className='indent-4 text-sm w-3/4 rounded-lg shadow-xl'>{comment.message}</p>
         </div>
        ) : (
          <p className='text-sm border-b-2 border-dashed rounded-xl shadow-xl w-full'>{comment.message}</p>
        )}{' '}

        <CommentActions
        postId={comment.postId}
        commentId={comment.id}
        replyCount={comment.children.length}
      />
 <div className='flex flex-row items-center space-x-2 p-2'>
          <p>{comment.createdBy}</p>
          <p>{format(new Date(comment.createdAt), 'MMM dd,')}</p>
        </div>
      </div>


      {comment.children && comment.children.length > 0 && (
        <ListComments comments={comment.children} />
      )}
    </>
  )
}
function ListComments({ comments }: { comments: Array<CommentWithChildren> }) {
  return (
    <>
      {comments.map((comment) => {
        return <Comment key={comment.id} comment={comment} />
      })}
    </>
  )
}

export default ListComments
