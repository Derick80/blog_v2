import { TrashIcon } from '@heroicons/react/24/solid'
import { Link } from '@remix-run/react'

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
              <TrashIcon className='rounded-full' />
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
