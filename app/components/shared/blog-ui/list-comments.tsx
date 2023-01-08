import React from 'react'
import { CommentWithChildren } from '~/utils/schemas/comment-schema'
import CommentForm from './comment-form'
import { Box, Paper } from '@mantine/core'
import { useFetcher } from '@remix-run/react'
import { useMatchesData } from '~/utils/utils'
import { AvatarCircle } from './card'

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

  const fetcher = useFetcher()

  const matches = useMatchesData('/blog')
  console.log(matches, 'matches')

  const comments = matches?.post?.comments.find(
    (comment) => comment.parentId === commentId
  )

  console.log(comments, 'comments')

  return (
    <>
      <div className='border-black mt-2 flex w-full flex-col rounded-l-3xl border-2'>
        {replying ? (
          <CommentForm
            parentId={commentId}
            userId={userId}
            postId={postId}
            createdBy={createdBy}
          />
        ) : (
          <></>
        )}

        <div className='flex w-full flex-row items-center justify-between p-2'>
          <button
            className='border-transparent inline-flex items-center space-x-1.5 rounded border bg-crimson6 p-2 px-3 py-2 text-sm font-medium leading-4 shadow-sm'
            type='button'
            onClick={() => setReplying(!replying)}
          >
            <p className='text-xs'>Reply</p>
          </button>
        </div>
      </div>
    </>
  )
}

function Comment({ comment }: { comment: CommentWithChildren }) {
  const users = comment.user
  console.log(users, 'users')

  return (
    <>
      <Paper withBorder radius='md' mb='md' p='md'>
        <Box
          sx={() => ({
            display: 'flex'
          })}
        ></Box>

        <Box
          pl='md'
          sx={() => ({
            display: 'flex',
            flexDirection: 'row-reverse',
            alignItems: 'center',
            justifyContent: 'space-between'
          })}
        >
          {comment.user.avatarUrl && (
            <AvatarCircle
              avatarUrl={comment.user.avatarUrl}
              userName={users.userName}
              createdBy={comment.createdBy}
              createdAt={comment.createdAt}
              updatedAt={comment.updatedAt}
            />
          )}
          {comment.message}
        </Box>

        <CommentActions
          commentId={comment.id || ''}
          replyCount={comment.children.length}
          userId={comment.user.id}
          postId={comment.postId}
          createdBy={comment.createdBy}
        />

        {comment.children && comment.children.length > 0 && (
          <ListComments key={comment.parentId} comments={comment.children} />
        )}
      </Paper>
    </>
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
