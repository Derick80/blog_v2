import { Avatar, Text, Box, Button, Group, Paper } from '@mantine/core'
import { Form, Link, NavLink, useFetcher, useNavigate } from '@remix-run/react'
import { format } from 'date-fns'
import { useState } from 'react'
import type { CommentWithChildren } from '~/utils/schemas/comment-schema'
import { useOptionalUser } from '~/utils/utilities'
import FormComments from './com-form'

function CommentActions({
  commentId,
  postId,
  userId,
  message,
}: {
  postId: string
  commentId: string
  userId: string
  message?: string
}) {
  const [replying, setReplying] = useState(false)
const user = useOptionalUser()
const currentUser = user?.id
const editCommentFetcher = useFetcher()
const [editing, setEditing] = useState(false)
  return (
    <>
      <Group position='apart' mt='md'>
        <Button onClick={() => setReplying(!replying)}>Reply</Button>
        {currentUser === userId && (
          <><Form method='post' action={ `${commentId}/delete` }>
            <Button type='submit' name='_action' value='deleteComment'>
              Delete
            </Button>
          </Form>
{/* `comments/${commentId}/edit` */}
              <Button
                onClick={() => setEditing(!editing)}
              >Edit</Button>
              {editing && (
                <editCommentFetcher.Form method='post' action={ `comments/${commentId}/edit` }>
                  <input type='hidden' name='postId' value={postId} />
                  <input type='hidden' name='commentId' value={commentId} />
                  <input type='hidden' name='userId' value={userId} />
                  <textarea name='message'
                    defaultValue={message}
                  />
                  <Button type='submit' name='_action' value='editComment'>
                    Save
                  </Button>
                </editCommentFetcher.Form>
              )}
           </>
        )}
      </Group>

      {replying && <FormComments postId={postId} parentId={commentId} />}
    </>
  )
}

function Comment({ comment }: { comment: CommentWithChildren }) {
  const editCommentFetcher = useFetcher()

  const [editing, setEditing] = useState(false)
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
          <div className='flex flex-row w-full items-center'>
        {editing ? (<>
          <editCommentFetcher.Form method='post' action={ `comments/${comment.id}/edit` }>
                  <input type='hidden' name='postId' value={comment.postId} />
                  <input type='hidden' name='commentId' value={comment.id} />
                  <input type='hidden' name='userId' value={comment.userId} />
                  <textarea name='message'
                    defaultValue={comment.message}
                  />
                  <Button type='submit' name='_action' value='editComment'>
                    Save
                  </Button>
                </editCommentFetcher.Form>
        </>):(
         <>
         <p className='text-sm'>{comment.message}</p>
         </>
        )}
        <Button onClick={() => setEditing(!editing)}>Edit</Button>
        </div>
        </Box>
      </Box>

      <CommentActions postId={comment.postId} commentId={comment.id} userId={comment.userId} message={comment.message} />

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
