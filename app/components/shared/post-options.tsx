import { Form } from '@remix-run/react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { iconAttrs, VerticalDots } from './icons'
import { Dialog } from './layout/dialog'
import { Modal } from './layout/modal'

export type OptionProps = {
  id: string
  published: boolean | null | undefined
}
export default function PostOptions({ id, published }: OptionProps) {
  const [expand, setExpand] = useState(false)

  return (
    <div className='flex flex-col items-center justify-center'>
      <button onClick={() => setExpand(!expand)}>
        <span className='material-symbols-outlined'>more_vert</span>
      </button>

      <Dialog isOpen={expand} handleClose={() => setExpand(false)}>
        <>
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
          <button>
            <Link className='btn-base btn-solid-info' to={`/blog/${id}/edit`}>
              <span className='material-symbols-outlined'>edit</span>
              Edit
            </Link>
          </button>
          <Form method='post' action={`/blog/${id}/delete`}>
            <button className='btn-base btn-solid-danger'>
              <span className='material-symbols-outlined'>delete</span>
              Delete
            </button>
          </Form>
        </>
      </Dialog>
    </div>
  )
}
