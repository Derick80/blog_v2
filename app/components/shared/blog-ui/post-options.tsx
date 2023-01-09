import { DotsVerticalIcon } from '@radix-ui/react-icons'
import { Form } from '@remix-run/react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Dialog } from '../layout/dialog'
import { Modal } from '../layout/modal'

export type OptionProps = {
  id: string
  published: boolean | null | undefined
}
export default function PostOptions({ id, published }: OptionProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='flex flex-col items-center justify-center'>
      <button onClick={() => setIsOpen(!isOpen)}>
        {!isOpen ? (
          <DotsVerticalIcon />

        ) : (

          <>
          <DotsVerticalIcon className='rotate-90 transform ' /><div
              className='flex flex-col items-center'
            >

                { published ? (
                  <>
                  <button
                    className='border-transparent inline-flex items-center space-x-1.5 rounded border bg-crimson6 p-2 px-3 py-2 text-sm font-medium leading-4 shadow-sm'
                  >
                  <Link
                    className='btn-base btn-solid-warn'
                    to={ `/blog/${id}/unpublish` }
                  >
                    Unpublish
                  </Link>
                  </button>
                  </>
                ) : (
                  <div>
                    <Link
                      className='btn-base btn-solid-success'
                      to={ `/blog/${id}/publish` }
                    >
                      Publish
                    </Link>
                  </div>
                ) }
                <button
                  className='border-transparent inline-flex items-center space-x-1.5 rounded border bg-crimson6 p-2 px-3 py-2 text-sm font-medium leading-4 shadow-sm'
                >
                  <Link className='btn-base btn-solid-info' to={ `/blog/${id}/edit` }>
                    Edit
                  </Link>
                </button

                >
                <Form method='post' action={ `/blog/${id}/delete` }>
                  <button   className='border-transparent inline-flex items-center space-x-1.5 rounded border bg-crimson6 p-2 px-3 py-2 text-sm font-medium leading-4 shadow-sm'>
                    Delete
                  </button>
                </Form>

            </div>
          </>
        )}
      </button>

    </div>
  )
}
