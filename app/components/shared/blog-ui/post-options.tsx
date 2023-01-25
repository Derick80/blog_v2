import { Group, Menu, ActionIcon } from '@mantine/core'
import { DotsVerticalIcon } from '@radix-ui/react-icons'
import { Form, NavLink } from '@remix-run/react'
import {
  IconChevronDown,
  IconDotsVertical,
  IconEdit,
  IconFileMinus,
  IconFilePlus,
  IconTrash
} from '@tabler/icons'
import { useState } from 'react'

export type OptionProps = {
  id: string
  published: boolean | null | undefined
}
export default function PostOptions({ id, published }: OptionProps) {
  const [open, setOpen] = useState(false)
  return (
    <div className='flex w-fit  items-center justify-center'>
      <div className=' '>
        <div className='flex flex-row items-center justify-around space-x-2'>
          <button
            type='button'
            className='text-gray-700 bg-white hover:bg-gray-50 focus:ring-indigo-500 inline-flex w-52 justify-center rounded-md py-2  text-sm font-medium focus:outline-none focus:ring-2'
            id='options-menu'
            aria-expanded='true'
            aria-haspopup='true'
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <IconChevronDown className='rotate-180 transform' />
            ) : (
              <IconChevronDown />
            )}
          </button>
        </div>
        {open && (
          <div className='divide-gray-100 ring-black absolute z-40 mt-2 w-52 divide-y rounded-md bg-slate8 shadow-lg ring-1 ring-opacity-5 focus:outline-none'>
            <div className='px- py-1 '>
              <NavLink
                className={({ isActive }) =>
                  ` ${
                    isActive
                      ? 'border-black flex space-x-2 border-b-2'
                      : 'flex flex-row items-center space-x-2'
                  }`
                }
                to={`/blog/${id}/edit`}
                onClick={() => setOpen(!open)}
              >
                <IconEdit />
                <p>Edit</p>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  ` ${
                    isActive
                      ? 'border-black flex space-x-2 border-b-2'
                      : 'flex flex-row items-center space-x-2'
                  }`
                }
                to={`/blog/${id}/delete`}
                onClick={() => setOpen(!open)}
              >
                <IconTrash />
                <p>Delete</p>
              </NavLink>
              {published ? (
                <NavLink
                  className={({ isActive }) =>
                    ` ${
                      isActive
                        ? 'border-black flex space-x-2 border-b-2'
                        : 'flex flex-row items-center space-x-2'
                    }`
                  }
                  to={`/blog/${id}/unpublish`}
                  onClick={() => setOpen(!open)}
                >
                  <IconFileMinus />
                  <p>Unpublish</p>
                </NavLink>
              ) : (
                <NavLink
                  className={({ isActive }) =>
                    ` ${
                      isActive
                        ? 'border-black flex space-x-2 border-b-2'
                        : 'flex flex-row items-center space-x-2'
                    }`
                  }
                  to={`/blog/${id}/publish`}
                  onClick={() => setOpen(!open)}
                >
                  <IconFilePlus />

                  <p>Publish</p>
                </NavLink>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
