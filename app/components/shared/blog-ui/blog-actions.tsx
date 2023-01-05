import { Link } from '@remix-run/react'

export type BlogActionProps = {
  commentId: string
  postId: string
}

export default function BlogActions({ commentId, postId }: BlogActionProps) {
  return (
    <div className='flex flex-col justify-start'>
      <div className='flex flex-col justify-center space-y-2'>
        <button>
          <Link
            className='btn-base btn-solid-info'
            to={`/blog/${postId}/${commentId}/edit`}
          >
            <span className='material-symbols-outlined'>edit</span>
            Edit
          </Link>
        </button>
        <Link
          className='btn-base btn-solid-danger'
          to={`/blog/${postId}/${commentId}/delete`}
        >
          <span className='material-symbols-outlined'>delete</span>
          Delete
        </Link>
      </div>
    </div>
  )
}
