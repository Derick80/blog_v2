import { Avatar, Box, Paper } from '@mantine/core'
import {
  CheckIcon,
  Cross1Icon,
  Cross2Icon,
  Pencil1Icon,
  TrashIcon
} from '@radix-ui/react-icons'
import { Link, NavLink, useFetcher, useNavigation } from '@remix-run/react'
import { format } from 'date-fns'
import React from 'react'
import { useState } from 'react'
import type { CommentWithChildren } from '~/utils/schemas/comment-schema'
import { useOptionalUser } from '~/utils/utilities'
import Button from '../shared/button'
import FormComments from './com-form'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

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
    <div className='flex flex-row items-center gap-2 '>
      <p className='text-xs text-gray-500'>{getReplyCountText(replyCount)}</p>
      {user ? (
        <>
          <Button
            variant='primary_filled'
            size='small'
            onClick={() => setReplying(!replying)}
          >
            Reply
          </Button>
        </>
      ) : (
        <Button variant='primary_filled' size='small' disabled>
          <NavLink to='/login'>Login to Reply</NavLink>
        </Button>
      )}
      {currentUser === userId && (
        <>
          <deleteCommentFetcher.Form
            method='post'
            action={`comments/${commentId}/delete`}
          >
            <Button variant='danger_filled' size='small'>
              <TrashIcon />
            </Button>
          </deleteCommentFetcher.Form>
        </>
      )}

      {replying && <FormComments postId={postId} parentId={commentId} />}
    </div>
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
    <div className='items-center bg-red-400'>
      <div className='flex w-full flex-col'>
        {editing ? (
          <>
            <Editor comment={comment} setState={setEditing} />
          </>
        ) : (
          <div className='flex items-center'>
            <p className='prose w-1/2  rounded-md p-1'>{comment.message}</p>
            <div className='flex w-1/2 flex-col items-center gap-1'>
              <div className='flex flex-row items-center gap-2'>
                <p className='text-xs text-gray-500'>Posted by</p>
                <Avatar
                  component={Link}
                  to={`/users/${comment.user.id}`}
                  src={comment.user.avatarUrl}
                />
              </div>
              <p className='text-xs text-gray-500'>
                {dayjs().from(new Date(comment.createdAt), true)} ago..{' '}
              </p>
            </div>
            {comment.userId === currentUser?.id && (
              <Button
                variant='primary_filled'
                size='small'
                onClick={() => setEditing(!editing)}
              >
                {editing ? <Cross2Icon /> : <Pencil1Icon />}
              </Button>
            )}
          </div>
        )}

        <div className='flex flex-row justify-center gap-2'>
          <CommentActions
            postId={comment.postId}
            commentId={comment.id}
            userId={comment.user.id}
            message={comment.message}
            replyCount={comment?.children?.length}
          />
        </div>
      </div>

      {comment.children ? <ListComments comments={comment?.children} /> : null}
    </div>
  )
}

function ListComments({ comments }: { comments: CommentWithChildren[] }) {
  return (
    <>
      {comments.map((comment) => {
        return <Comment key={comment.id} comment={comment} />
      })}
    </>
  )
}

export default ListComments

function Editor({
  comment,
  setState
}: {
  comment: CommentWithChildren
  setState: any
}) {
  const editCommentFetcher = useFetcher()
  let formRef = React.useRef<HTMLFormElement>(null)
  const [editing, setEditing] = useState(setState ? false : true)
  let navigation = useNavigation()
  navigation.formMethod = 'post'
  navigation.formAction = `comments/${comment.id}/edit`

  console.log(editing)

  React.useEffect(() => {
    if (editCommentFetcher.type === 'done') {
      formRef.current?.reset()
    }
  }, [editCommentFetcher.type])

  return (
    <editCommentFetcher.Form
      // I don't think this is working
      ref={formRef}
      method='POST'
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
      <Button
        variant='primary_filled'
        size='small'
        name='_action'
        value='editComment'
      >
        <CheckIcon />
      </Button>
      <Button
        variant='danger_filled'
        size='small'
        name='_action'
        value='cancel'
        onClick={() => setEditing(!editing)}
      >
        {setState(!editing) ? <Pencil1Icon /> : <Cross1Icon />}
      </Button>
    </editCommentFetcher.Form>
  )
}
