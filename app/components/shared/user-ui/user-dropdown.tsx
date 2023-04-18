import { UserType } from '~/utils/schemas/user-schema'
import Button from '../button'
import Avatar from '../avatar'
import { Form, NavLink } from '@remix-run/react'
import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'
import React from 'react'

export default function UserDropdown({ user }: { user: UserType }) {
  const [open, setOpen] = React.useState(false)
  return (
    <>
      <Button
        variant='icon_unfilled'
        size='base'
        onClick={() => setOpen(!open)}
      >
        <Avatar imageUrl={user?.avatarUrl} h={10} w={10} />
        <p className='text-xs text-black dark:text-slate-50'>
          {user.userName}{' '}
        </p>
        {open ? <ChevronUpIcon /> : <ChevronDownIcon />}
      </Button>
      <div className='relative inline-block text-left'>
        {open ? (
          <div
            id='dropdownAvatarName'
            className='absolute right-0 top-0 z-10 w-44 divide-y divide-gray-100 rounded-lg bg-slate-400 shadow dark:divide-gray-600 dark:bg-gray-700'
          >
            <div className='px-4 py-3 text-sm text-gray-900 dark:text-white'>
              <div className='font-medium '>Hello</div>
              <div className='truncate'>{user.email}</div>
            </div>
            <ul
              className='py-2 text-sm text-gray-700 dark:text-gray-200'
              aria-labelledby='dropdownInformdropdownAvatarNameButtonationButton'
            >
              <li>
                <NavLink
                  to='/'
                  className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={`/users/${user.userName}`}
                  className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                >
                  Profile
                </NavLink>
              </li>
            </ul>
            <div className='py-2'>
              <Form method='POST'>
                <button
                  type='submit'
                  className='block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                >
                  Sign out
                </button>
              </Form>
            </div>
          </div>
        ) : null}
      </div>
    </>
  )
}
