import { DotsVerticalIcon } from '@radix-ui/react-icons'
import { Form } from '@remix-run/react'
import { IconEdit, IconFileMinus, IconTrash } from '@tabler/icons'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../button'
import { Dialog } from '../layout/dialog'
import { Modal } from '../layout/modal'

export type OptionProps = {
  id: string
  published: boolean | null | undefined
}
export default function PostOptions({ id, published }: OptionProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
    className='flex flex-row items-center justify-center space-y-2'
    >
      <button onClick={() => setIsOpen(!isOpen)}>
{isOpen ? (
          <DotsVerticalIcon className='rotate-90 transform ' />
        ) : (
          <DotsVerticalIcon />
        )}
        </button>
        {isOpen && (
                <Modal
                className='w-fit h-40'
                isOpen={isOpen} onClick={() => setIsOpen(false)}>

            <div className=''>
              {published ? (
                <>
                    <Link
                className='border-transparent flex w-full items-center space-x-1.5 rounded bg-crimson6 p-2 px-3 py-2 text-sm font-medium leading-4 shadow-sm'
                to={`/blog/${id}/unpublish`}
                    >
                    <IconFileMinus />
                      <p>Unpublish</p>
                    </Link>
                </>
              ) : (


                <Link
                className='border-transparent flex w-full items-center space-x-1.5 rounded bg-crimson6 p-2 px-3 py-2 text-sm font-medium leading-4 shadow-sm'
                   to={`/blog/${id}/publish`}
                  >
                    Publish
                  </Link>


              )}


                <Link
                className='border-transparent flex w-full items-center space-x-1.5 rounded border bg-crimson6 p-2 px-3 py-2 text-sm font-medium leading-4 shadow-sm'

                to={`/blog/${id}/edit`}
                >
                 <IconEdit />
               <p>Edit</p>
                </Link>
              <Form
                className='border-transparent flex w-full items-center space-x-1.5 rounded border bg-crimson6 p-2 px-3 py-2 text-sm font-medium leading-4 shadow-sm'

              method='post' action={`/blog/${id}/delete`}>
               <IconTrash />
                <p>Delete</p>
              </Form>
            </div>
          </Modal>
        )}
    </div>
  )
}
