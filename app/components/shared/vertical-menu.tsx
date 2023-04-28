import { DotsHorizontalIcon, DotsVerticalIcon } from '@radix-ui/react-icons'
import React from 'react'
import Button from './button'

export default function VerticalMenu({
  children
}: {
  children: React.ReactNode
}) {
  const [open, setOpen] = React.useState(false)

  return (
    <div className='relative'>
      <Button onClick={() => setOpen(!open)} variant='ghost' size='tiny'>
        {!open ? (
          <DotsVerticalIcon className='h-6 w-6' />
        ) : (
          <DotsHorizontalIcon className='h-6 w-6' />
        )}
      </Button>
      {open && (
        <div
          onClick={() => setOpen((open) => !open)}
          onMouseLeave={() => setOpen((open) => !open)}
          className='absolute right-0 top-0 z-10 flex flex-col items-center gap-1 rounded-md bg-slate-800 p-2 text-xs text-slate-50 shadow-lg'
        >
          {children}
        </div>
      )}
    </div>
  )
}
