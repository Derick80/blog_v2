import { Link } from '@remix-run/react'

export type BlogActionProps = {
  id: string
  published: boolean | null | undefined
}

export default function BlogActions({ id, published }: BlogActionProps) {
  return (
    <div className='flex flex-col justify-start'>
      <div className='flex flex-col justify-center space-y-2'>
        {published ? (
          <Link
            className='btn-base btn-solid-warn'
            to={`/blog/${id}/unpublish`}
          >
            Unpublish
          </Link>
        ) : (
          <div>
            <Link
              className='btn-base btn-solid-success'
              to={`/blog/${id}/publish`}
            >
              Publish
            </Link>
          </div>
        )}
        <Link className='btn-base btn-solid-success' to={`/blog/${id}/edit`}>
          <span className='material-symbols-outlined'>edit</span>
          Edit
        </Link>
        <Link className='btn-base btn-solid-danger' to={`/blog/${id}/archive`}>
          <span className='material-symbols-outlined'>delete</span>
          Delete
        </Link>
      </div>
    </div>
  )
}
