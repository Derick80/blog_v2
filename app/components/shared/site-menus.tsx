import { ChevronUpIcon, ChevronDownIcon } from '@radix-ui/react-icons'
import { NavLink } from '@remix-run/react'
import React from 'react'

export type MenuBoxProps = {
  title: string
}
export default function MenuBox({ title }: MenuBoxProps) {
  const [menu, setMenu] = React.useState(false)
  return (
  <>     
      
    
            <button 
            className='relative flex flex-row items-center gap-1 md:gap-2'
              onClick={() => setMenu(!menu)}>

        <h6 className='text-sm font-bold'>{title}</h6>
          {menu ? (
            <ChevronUpIcon className=' text-teal-400' />
          ) : (
            <ChevronDownIcon className=' text-teal-400' />
          )}
       

      {menu && (
      
          <div className='absolute top-4 left-0 right-0  flex w-fit flex-col items-center justify-between rounded-md p-1 bg-slate-300 dark:bg-slate-900'>
            <MapMenuItems menuItems={MenuItems} />
          
          </div>
       
      )}
       </button>
      </>
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
