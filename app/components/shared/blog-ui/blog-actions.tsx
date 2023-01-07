import { Link } from '@remix-run/react'
import { useState } from 'react'

export type BlogActionProps = {
  commentId: string
  postId: string
}

export default function BlogActions({ commentId, postId }: BlogActionProps) {
  const [open, setOpen] = useState(true)
  return (
    <button
      onClick={() => setOpen(!open)}
      className='flex flex-1 flex-col items-center rounded-full bg-crimson6  hover:bg-crimson4'
    >
      <Link
        className='btn-base btn-solid-info'
        to={`/blog/${postId}/${commentId}/edit`}
      >
        <span className='material-symbols-outlined'>edit</span>
        Edit
      </Link>

      <Link
        className='btn-base btn-solid-danger'
        to={`/blog/${postId}/${commentId}/delete`}
      >
        <span className='material-symbols-outlined'>delete</span>
        Delete
      </Link>
    </button>
  )
}
