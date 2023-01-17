import { Link } from '@remix-run/react'
import { IconEdit } from '@tabler/icons'
import { useState } from 'react'

export type BlogActionProps = {
  commentId: string
  postId: string
}

export default function BlogActions({ commentId, postId }: BlogActionProps) {
  const [open, setOpen] = useState(true)
  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className='flex flex-1 flex-col items-center rounded-full bg-crimson6  hover:bg-crimson4'
      ></button>
      <Link
        className='border-transparent inline-flex items-center space-x-1.5 rounded border bg-crimson6 p-2 px-3 py-2 text-sm font-medium leading-4 shadow-sm'
        to={`/blog/${postId}/${commentId}/edit`}
      >
        <span className='material-symbols-outlined'>edit</span>
        Edit
      </Link>

      <Link
        className='border-transparent inline-flex items-center space-x-1.5 rounded border bg-crimson6 p-2 px-3 py-2 text-sm font-medium leading-4 shadow-sm'
        to={`/blog/${postId}/${commentId}/delete`}
      >
        <span className='material-symbols-outlined'>delete</span>
        Delete
      </Link>
    </div>
  )
}

function BlogActionBox({ commentId, postId }: BlogActionProps) {


  return (
    <>
     <Link
        className='border-transparent inline-flex items-center space-x-1.5 rounded border bg-crimson6 p-2 px-3 py-2 text-sm font-medium leading-4 shadow-sm'
        to={`/blog/${postId}/${commentId}/edit`}
      >
<IconEdit>
  Edit
  </IconEdit>        Edit
      </Link>

      <Link
        className='border-transparent inline-flex items-center space-x-1.5 rounded border bg-crimson6 p-2 px-3 py-2 text-sm font-medium leading-4 shadow-sm'
        to={`/blog/${postId}/${commentId}/delete`}
      >
        <span className='material-symbols-outlined'>delete</span>
        Delete
      </Link>
    </>
  )
}