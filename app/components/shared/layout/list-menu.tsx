import { Link } from '@remix-run/react'
import { IconChevronUp } from '@tabler/icons'
import { useState } from 'react'

export type ListMenuProps = {
  link: string
  children: React.ReactNode
  id: string
}
export default function ListMenu({ link, children, id }: ListMenuProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className='flex flex-col items-center'
      >
        {open ? (
          <IconChevronUp className='h-5 w-5 rotate-180 transform' />
        ) : (
          <IconChevronUp className='h-5 w-5' />
        )}
        <span>Admin</span>
        {open && (
          <ul className='mb-10 flex h-full w-full flex-col items-center justify-center space-y-10'>
            <li key={id} className='h-5 w-10'>
              <Link to={`${link}`} prefetch='intent'>
                {children}
              </Link>
            </li>
          </ul>
        )}
      </button>
    </>
  )
}
