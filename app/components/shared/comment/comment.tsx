import { Comment, User } from '@prisma/client'
import { Link } from '@remix-run/react'
import { PostAndComments } from '~/models/post.server'

export type CommentProps = {
  comment: {
    id: string
    message: string
    postId: string
  }
  user: {
    id: string
    userName: string
    avatarUrl: string
    createdAt: string
  }[]
}

export default function CommentContent({ comment, user }: CommentProps) {
  return (
    <>
      <li key={comment.id} className='flex flex-col space-y-2 border-2'>
        <span>
          <div>{comment.message}</div>{' '}
        </span>
        {user.map((u) => (
          <div key={u.id} className='flex flex-row'>
            <img src={u.avatarUrl} alt={u.userName} />
            <div className='flex flex-col'>
              <span>{u.userName}</span>
            </div>
          </div>
        ))}

        <div className='flex flex-row justify-end'>
          <form
            method='post'
            action={`/blog/${comment.postId}/${comment.id}/delete`}
          >
            <button type='submit'>
              {' '}
              <span className='material-symbols-outlined'>delete</span>
            </button>
          </form>
          <Link to={`/blog/${comment.postId}/${comment.id}`}>Edit</Link>
        </div>
      </li>
    </>
  )
}

type UserCommentBoxProps = {
  id: string
  userName: string
  avatarUrl: string
  createdAt: string
}

function UserCommentBox({
  id,
  userName,
  avatarUrl,
  createdAt
}: UserCommentBoxProps) {
  return (
    <div className='relative'>
      <div key={id} className='flexf flex-row items-center justify-start'>
        <img src={avatarUrl} alt={userName} />
        <div className='flex flex-col'>
          <span>{userName}</span>
          <span>{createdAt}</span>
        </div>
      </div>
    </div>
  )
}
