import { ChevronUpIcon } from '@heroicons/react/20/solid'
import { NavLink } from '@remix-run/react'
import { useState } from 'react'
import { adminLinks } from '~/utils/schemas/constants/links'

export type AdminMakerProps = {
  toggle?: () => void
  children?: React.ReactNode

  link: string
  text: string
}
export default function AdminMaker() {
  const [toggle, setToggle] = useState(false)
  const [open, setOpen] = useState(false)

  return (
   <button onClick={()=> setOpen(!open)} className='flex flex-col items-center'>
    {open ?  <ChevronUpIcon className='h-5 w-5 transform rotate-180' /> :<ChevronUpIcon className='h-5 w-5' />}
   <span>Admin</span>
    {open && (
       <ul className='mb-10 flex h-full w-full flex-col items-center justify-center space-y-10'>
       {adminLinks.map((link) => (
         <li key={link.text} className='h-5 w-10'>
           <NavLink
             to={`${link.link}`}
             className={({ isActive }) =>
               ` ${
                 isActive
                   ? 'flex flex-col items-center border-b-2 border-black'
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
