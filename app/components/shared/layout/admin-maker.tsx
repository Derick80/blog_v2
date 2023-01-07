import { ChevronUpIcon } from '@radix-ui/react-icons'
import { NavLink } from '@remix-run/react'
import { useState } from 'react'
import { adminLinks } from '~/utils/schemas/constants/links'
import { useOptionalUser } from '~/utils/utils'

export type AdminMakerProps = {
  array: {
    link: string
    text: string
    children: React.ReactNode
  }[]
}
export default function AdminMaker({ array }: AdminMakerProps) {
  const [toggle, setToggle] = useState(false)
  const [open, setOpen] = useState(false)

  return (
    <button
      onClick={() => setOpen(!open)}
      className='flex flex-col items-center'
    >
      {open ? (
        <ChevronUpIcon className='h-5 w-5 rotate-180 transform' />
      ) : (
        <ChevronUpIcon className='h-5 w-5' />
      )}
      <p>Actions</p>
      {open && (
        <ul className='mb-10 flex h-full w-full flex-col items-center justify-center space-y-10 dark:bg-crimson5'>
          {array.map((link) => (
            <li key={link.text} className='h-5 w-10'>
              <NavLink
                to={`${link.link}`}
                className={({ isActive }) =>
                  ` ${
                    isActive
                      ? 'border-black flex flex-col items-center border-b-2'
                      : 'flex flex-col items-center justify-around'
                  }`
                }
                onClick={() => setToggle(!toggle)}
                prefetch='intent'
              >
                {link.children}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </button>
  )
}
