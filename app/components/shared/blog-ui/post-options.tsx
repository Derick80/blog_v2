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
    <div className="flex w-fit  items-center justify-center">
    <div className=" ">
                <div
                  className="flex flex-row items-center justify-around space-x-2"
                >
                    <button type="button" className="inline-flex justify-center w-52 py-2 text-sm font-medium text-gray-700 bg-white rounded-md  hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500" id="options-menu" aria-expanded="true" aria-haspopup="true"
                    onClick={() => setOpen(!open)}
                    >

                       {open ? <IconChevronDown
  className='transform rotate-180'
                       /> : <IconChevronDown
                      />}
                    </button>
                </div>
      {
        open && <div
        className="absolute mt-2 w-52 z-40 divide-y divide-gray-100 rounded-md bg-slate8 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="px- py-1 ">
          <NavLink
            className={({ isActive }) =>
              ` ${
                isActive
                  ? 'border-black flex border-b-2 space-x-2'
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
                  ? 'border-black flex border-b-2 space-x-2'
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
                    ? 'border-black flex border-b-2 space-x-2'
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
                    ? 'border-black flex border-b-2 space-x-2'
                    : 'flex flex-row items-center space-x-2'
                }`
              }
              to={`/blog/${id}/publish`}
              onClick={() => setOpen(!open)}
            >
              <IconFilePlus  />

              <p>Publish</p>
            </NavLink>


          )}
        </div>
      </div>

      }
      </div>
    </div>
  )
}
