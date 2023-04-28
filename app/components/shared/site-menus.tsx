import { ChevronUpIcon, ChevronDownIcon } from '@radix-ui/react-icons'
import { NavLink } from '@remix-run/react'
import React from 'react'
import { RowBox } from './boxes'

export type MenuBoxProps = {
  title: string
}
export default function MenuBox({ title }: MenuBoxProps) {
  const [menu, setMenu] = React.useState(false)
  return (
  
     <RowBox
      
     >
            <button 
            className='flex flex-row items-center gap-1 md:gap-2'
              onClick={() => setMenu(!menu)}>

        <h6 className='text-sm font-bold'>{title}</h6>
          {menu ? (
            <ChevronUpIcon className='text-teal-400' />
          ) : (
            <ChevronDownIcon className='text-teal-400' />
          )}
        </button>
     
      {menu && (
        <div
          className='relative right-0 flex flex-col  border-none'
          onMouseLeave={() => setMenu(!menu)}
        >
          <div className='absolute z-10 flex w-fit flex-col items-center justify-between rounded-md bg-white/60 dark:bg-slate-900'>
            <MapMenuItems menuItems={MenuItems} />
          </div>
        </div>
      )}
     </RowBox>
  )
}

export const MenuItems = [
  {
    title: 'CV',
    path: '/cv'
  },
  {
    title: 'Categories',
    path: '/categories'
  },

  {
    title: 'Users',
    path: '/users'
  },
  {
    title: 'UI',
    path: '/ui-components'
  }
]

function MapMenuItems({ menuItems }: { menuItems: typeof MenuItems }) {
  return (
    <>
      {menuItems.map((item, index) => (
        <NavLink key={index} to={item.path}>
          {item.title}
        </NavLink>
      ))}
    </>
  )
}
