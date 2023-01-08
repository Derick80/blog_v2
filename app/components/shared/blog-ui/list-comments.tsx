import React from 'react'
import type { CommentWithChildren } from '~/utils/schemas/comment-schema'
import CommentForm from './comment-form'
import { AvatarCircle } from './card'
import { Pencil1Icon, TrashIcon } from '@radix-ui/react-icons'
import { Form } from '@remix-run/react'
import { NavLink } from 'react-router-dom'

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
    <>
      <div className='mt-2 flex-col w-full rounded-l-3xl hover:bg-crimson6 '>
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

        <div className='flex w-full flex-row-reverse items-center justify-between p-2'>
          <button
            className='border-transparent inline-flex items-center space-x-1.5 rounded border bg-crimson6 p-2 px-3 py-2 text-sm font-medium leading-4 shadow-sm'
            type='button'
            onClick={() => setReplying(!replying)}
          >
            <p className='text-xs'>Reply</p>
          </button>

           <Form action={`/blog/${postId}/${commentId}/delete`} method="post">
            <button type="submit" className='border-transparent inline-flex items-center space-x-1.5 rounded border bg-crimson6 p-2 px-3 py-2 text-sm font-medium leading-4 shadow-sm'>
              <TrashIcon />
              <p className='text-xs'>Delete</p>

            </button>
            </Form>
            <NavLink to={`/blog/${postId}/${commentId}/edit`}>
            <button className='border-transparent inline-flex items-center space-x-1.5 rounded border bg-crimson6 p-2 px-3 py-2 text-sm font-medium leading-4 shadow-sm'>
              <p className='text-xs'>Edit</p>
              <Pencil1Icon />
            </button>
            </NavLink>
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
      <div className='hover:bg-crimson6 flex flex-row-reverse items-center justify-between'>


          {comment.user.avatarUrl && (
            <AvatarCircle
              avatarUrl={comment.user.avatarUrl}
              userName={users.userName}
              createdBy={comment.createdBy}
              createdAt={comment.createdAt}
              updatedAt={comment.updatedAt}
            />
          )}
          <p className='border-bg-crimson5 border-transparent text-base indent-4'>{comment.message}</p>
          </div>

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

    </>
  )
}
function ListComments({ comments }: { comments: Array<CommentWithChildren> }) {
  return (
    <div className='hover:bg-crimson6'>
      {comments.map((comment) => {
        return <Comment key={comment.id} comment={comment} />
      })}
    </div>
  )
}

export default ListComments
