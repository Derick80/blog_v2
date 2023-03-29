import { Avatar, Box, Paper } from '@mantine/core'
import {
  CheckIcon,
  Cross2Icon,
  Pencil1Icon,
  TrashIcon
} from '@radix-ui/react-icons'
import { Link, NavLink, useFetcher } from '@remix-run/react'
import { format } from 'date-fns'
import React from 'react'
import { useState } from 'react'
import type { CommentWithChildren } from '~/utils/schemas/comment-schema'
import { useOptionalUser } from '~/utils/utilities'
import Button from '../shared/layout/button'
import FormComments from './com-form'

function getReplyCountText(count: number) {
  if (count === 0 || count === undefined) {
    return 'No replies'
  }

  if (count === 1) {
    return '1 reply'
  }

  return `${count} replies`
}

function CommentActions({
  commentId,
  postId,
  userId,
  message,
  replyCount
}: {
  postId: string
  commentId: string
  userId: string
  message?: string
  replyCount: number
}) {
  const [replying, setReplying] = useState(false)

  const user = useOptionalUser()
  const currentUser = user?.id
  const deleteCommentFetcher = useFetcher()

  return (
    <>
      <div className='flex flex-row items-center justify-between'>
        <div>{getReplyCountText(replyCount)}</div>
        {user ? (
          <Button
            variant='filled'
            size='base'
            onClick={() => setReplying(!replying)}
          >
            Reply
          </Button>
        ) : (
          <NavLink to='/login'>Login to Reply</NavLink>
        )}
        {currentUser === userId && (
          <>
            <deleteCommentFetcher.Form
              method='post'
              action={`${commentId}/delete`}
            >
              <button
                className='flex flex-row items-center justify-center'
                type='submit'
                name='_action'
                value='deleteComment'
              >
                <TrashIcon />
              </button>
            </deleteCommentFetcher.Form>
          </>
        )}
      </div>

      {replying && <FormComments postId={postId} parentId={commentId} />}
    </>
  )
}

function Comment({ comment }: { comment: CommentWithChildren }) {
  const currentUser = useOptionalUser()
  const editCommentFetcher = useFetcher()
  let formRef = React.useRef<HTMLFormElement>(null)
  React.useEffect(() => {
    if (editCommentFetcher.type === 'done') {
      formRef.current?.reset()
    }
  }, [editCommentFetcher.type])
  const [editing, setEditing] = useState(false)
  return (
    <Paper withBorder radius='md' mb='md' p='md'>
      <div className='flex flex-row items-center justify-between'>
        <Avatar
          component={Link}
          to={`/users/${comment.user.id}`}
          src={comment.user.avatarUrl}
        />
        <div className='ml-4 flex w-full flex-col'>
          <div className='flex w-full flex-row items-center justify-between'>
            <p>{format(new Date(comment.createdAt), 'MMM d, yyyy')}</p>
          </div>
          <div className='flex w-full flex-row gap-2'>
            {editing ? (
              <>
                <editCommentFetcher.Form
                  // I don't think this is working
                  ref={formRef}
                  method='post'
                  action={`comments/${comment.id}/edit`}
                  className='flex w-full gap-2'
                >
                  <input type='hidden' name='postId' value={comment.postId} />
                  <input type='hidden' name='commentId' value={comment.id} />
                  <input type='hidden' name='userId' value={comment.userId} />
                  <textarea
                    required
                    className='w-full'
                    name='message'
                    defaultValue={comment.message}
                  />
                  <button name='_action' value='editComment'>
                    <CheckIcon />
                  </button>
                </editCommentFetcher.Form>
              </>
            ) : (
              <div className='flex w-full flex-col gap-2'>
                <p>{comment.createdBy} wrote:</p>

                <p className='w-full rounded-md bg-slate8/10 text-sm'>
                  {comment.message}
                </p>
              </div>
            )}
            {comment.userId === currentUser?.id && (
              <Button
                variant='filled'
                size='base'
                onClick={() => setEditing(!editing)}
              >
                {editing ? <Cross2Icon /> : <Pencil1Icon />}
              </Button>
            )}
          </div>
        </div>
      </div>

      <CommentActions
        postId={comment.postId}
        commentId={comment.id}
        userId={comment.user.id}
        message={comment.message}
        replyCount={comment?.children?.length}
      />

      {comment.children ? <ListComments comments={comment?.children} /> : null}
    </Paper>
  )
}

function ListComments({ comments }: { comments: CommentWithChildren[] }) {
  return (
    <Box>
      {comments.map((comment) => {
        return <Comment key={comment.id} comment={comment} />
      })}
    </Box>
  )
}

export default ListComments
