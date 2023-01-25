import { ExitIcon } from '@radix-ui/react-icons'
import { Form, NavLink } from '@remix-run/react'
import {
  IconChevronDown,
  IconDoorExit,
  IconEdit,
  IconFilePencil,
  IconLogout,
  IconNewSection,
  IconSun
} from '@tabler/icons'
import { useState } from 'react'
import { Divider } from '../layout/divider'

export default function Dropdown() {
  const [open, setOpen] = useState(false)

  return (
    <div className='flex w-fit  items-center justify-center'>
      <div className='flex flex-row items-center justify-around space-x-2'>
        <div>
          <button
            type='button'
            className='text-gray-700 bg-white inline-flex w-fit justify-center rounded-md font-medium  '
            id='options-menu'
            aria-expanded='true'
            aria-haspopup='true'
            onClick={() => setOpen(!open)}
          >
            <p>More..</p>
            {open ? (
              <IconChevronDown className='rotate-180 transform' />
            ) : (
              <IconChevronDown />
            )}
          </button>
        </div>
        {open && (
          <div className='divide-gray-100 ring-black z-40 mt-2 w-52 divide-y rounded-md bg-slate8 shadow-lg ring-1 ring-opacity-5 focus:outline-none'>
            <div className='px-1 py-1 '>
              <NavLink
                className={({ isActive }) =>
                  ` ${
                    isActive
                      ? 'border-black flex space-x-2 border-b-2'
                      : 'flex flex-row items-center space-x-2'
                  }`
                }
                to='/blog/new'
                onClick={() => setOpen(!open)}
              >
                <IconNewSection />
                <p>New Post</p>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  ` ${
                    isActive
                      ? 'border-black flex space-x-2 border-b-2'
                      : 'flex flex-row items-center space-x-2'
                  }`
                }
                to='/drafts'
                onClick={() => setOpen(!open)}
              >
                {' '}
                <IconFilePencil />
                <p>Drafts</p>
              </NavLink>
              <Divider></Divider>
              <NavLink
                className={({ isActive }) =>
                  ` ${
                    isActive
                      ? 'border-black flex space-x-2 border-b-2'
                      : 'flex flex-row items-center space-x-2'
                  }`
                }
                to='/logout'
                onClick={() => setOpen(!open)}
              >
                <>
                  <Form method='post' action='/theme'>
                    <button type='submit'>
                      <IconSun />
                    </button>
                  </Form>
                </>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  ` ${
                    isActive
                      ? 'border-black flex space-x-2 border-b-2'
                      : 'flex flex-row items-center space-x-2'
                  }`
                }
                to='/logout'
                onClick={() => setOpen(!open)}
              >
                <>
                  <Form method='post' action='/logout'>
                    <button type='submit' className='flex space-x-1'>
                      <IconLogout />
                      <p>Logout</p>{' '}
                    </button>
                  </Form>
                </>
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
