import { Button } from '@mantine/core'
import { ChevronUpIcon } from '@radix-ui/react-icons'
import { NavLink } from '@remix-run/react'
import { IconChevronDown, IconChevronUp } from '@tabler/icons'
import { useState } from 'react'

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
    <Button
      onClick={() => setOpen(!open)}
      className='bottom-0 flex flex-col items-center rounded-full p-2'
    >
      {open ? <IconChevronUp /> : <IconChevronDown />}

      {open && (
        <div className='absolute items-center justify-center'>
          <ul className='relative flex h-full w-12 flex-col items-center justify-center space-y-5 rounded-xl p-2'>
            {array.map((link) => (
              <li key={link.text} className='h-5 w-10'>
                <NavLink
                  to={`${link.link}`}
                  className='flex flex-col items-center justify-around'
                  onClick={() => setToggle(!toggle)}
                  prefetch='intent'
                  style={{ textDecoration: 'none', color: 'currentcolor' }}
                >
                  {link.children}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Button>
  )
}
