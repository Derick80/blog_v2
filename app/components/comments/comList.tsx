import {
  Avatar,
  Text,
  Box,
  Button,
  Group,
  Paper,
  Textarea
} from '@mantine/core'
import { CheckIcon, Cross2Icon, Pencil1Icon, TrashIcon } from '@radix-ui/react-icons'
import { Form, Link, NavLink, useFetcher, useNavigate, useNavigation } from '@remix-run/react'
import { format } from 'date-fns'
import { useState } from 'react'
import type { CommentWithChildren } from '~/utils/schemas/comment-schema'
import { useOptionalUser } from '~/utils/utilities'
import FormComments from './com-form'

function CommentActions({
  commentId,
  postId,
  userId,
  message
}: {
  postId: string
  commentId: string
  userId: string
  message?: string
}) {
  const [replying, setReplying] = useState(false)
  const user = useOptionalUser()
  const currentUser = user?.id
  const deleteCommentFetcher = useFetcher()

  return (
    <>
      <div
      className='flex flex-row items-center justify-between'
      >
        <Button
          size='sm'
          variant='subtle'

        onClick={() => setReplying(!replying)}>Reply</Button>
        {currentUser === userId && (
          <>
            <deleteCommentFetcher.Form
              method='post'
              action={`${commentId}/delete`}
            >
              <Button
                size='xs'
                color='red'
                variant='subtle'

              type='submit' name='_action' value='deleteComment'>
               <TrashIcon />
              </Button>
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
  const navigate = useNavigation()
  const editCommentFetcher = useFetcher()

  const [editing, setEditing] = useState(false)
  return (
    <Paper withBorder radius='md' mb='md' p='md'>
      <div className='flex flex-row items-center justify-between'>


        <Avatar
          component={Link}
          to={`/users/${comment.user.id}`}
          src={comment.user.avatarUrl}
        />
        <div
          className='flex flex-col w-full ml-4'

        >
          <div
            className='flex w-full flex-row items-center justify-between'
          >
            <p>{comment.createdBy} wrote:</p>
            <p>{format(new Date(comment.createdAt), 'MMM d, yyyy')}</p>
          </div>
          <div className='flex w-full flex-row gap-2'>
            {editing ? (
              <>
                <editCommentFetcher.Form
                  method='post'
                  action={`comments/${comment.id}/edit`}
                  className='w-full flex gap-2'
                >
                  <input type='hidden' name='postId' value={comment.postId} />
                  <input type='hidden' name='commentId' value={comment.id} />
                  <input type='hidden' name='userId' value={comment.userId} />
                  <textarea
                    required
                    className='w-full'
                  name='message' defaultValue={comment.message} />
                  <Button type='submit'
                      variant='subtle'
                      size='xs'
                  name='_action' value='editComment'>
                    <CheckIcon />
                    </Button>
                </editCommentFetcher.Form>
              </>
            ) : (
              <>
                <p className='w-full text-sm'>{comment.message}</p>
              </>
            )}
            {comment.userId === currentUser?.id && (
              <Button
              size='xs'
              variant='subtle'

              onClick={() => setEditing(!editing)}>
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
      />

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
