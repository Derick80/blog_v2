import {
  ExitIcon,
} from '@radix-ui/react-icons'
import { Form, NavLink } from '@remix-run/react'

import {  Image, } from '@mantine/core'
import { BrandIcon } from '~/resources/brand-icon'
import { useOptionalUser } from '~/utils/utilities'
import MenuBox from '../site-menus'
import Button from '../button'

export default function Layout({ children }: { children: React.ReactNode }) {

  return (
    <div className='min-h-screen flex flex-col gap-2'>
      <NavigationBar />

        <main className='flex-grow relative mx-auto mt-10 flex w-full flex-col p-2 md:w-4/6 md:p-4'>
          {children}
        </main>
      
     
    </div>
  )
}

function NavigationBar() {
  const user = useOptionalUser()
  // fix w-4/s6 if I want to change the latout
  return (
    <div className='fixed left-0 right-0 top-0 z-20 mx-auto flex h-16 w-full flex-row items-center justify-between bg-slate-100 p-1 dark:bg-slate-800 md:p-2'>
      <BrandIcon />

      <NavLink
        style={({ isActive, isPending }) => {
          return {
            textDecorationLine: isActive ? 'underline' : '',
            color: isPending ? 'red' : 'black'
          }
        }}
        to='/'
      >
        <p className='text-sm font-semibold dark:text-slate-50'>Home</p>
      </NavLink>
      <NavLink
        style={({ isActive, isPending }) => {
          return {
            textDecorationLine: isActive ? 'underline' : '',
            color: isPending ? 'red' : 'black'
          }
        }}
        to='/blog'
      >
        <p className='text-sm font-semibold dark:text-slate-50'>Blog</p>
      </NavLink>

      <NavLink
        style={({ isActive, isPending }) => {
          return {
            textDecorationLine: isActive ? 'underline' : '',
            color: isPending ? 'red' : 'black'
          }
        }}
        to='/about'
      >
        <p className='text-sm font-semibold dark:text-slate-50'>About</p>
      </NavLink>
      <NavLink
        style={({ isActive, isPending }) => {
          return {
            textDecorationLine: isActive ? 'underline' : '',
            color: isPending ? 'red' : 'black'
          }
        }}
        to='/projects'
      >
        <p className='text-sm font-semibold dark:text-slate-50'>Projects</p>
      </NavLink>
      <MenuBox title='Links' />

      {/* <Switch size="md" onLabel={<SunIcon />} offLabel={<MoonIcon />} /> */}

      {user ? (
        <div className='flex flex-row gap-2 p-2'>
          <Image
            src={user.avatarUrl}
            alt={user.userName}
            radius='xl'
            width={32}
            height={32}
          />

          <Form
            className='flex items-center justify-center p-1'
            method='POST'
            action='/logout'
          >
            <Button variant='icon_unfilled' size='small'>
              <ExitIcon />
            </Button>
          </Form>
        </div>
      ) : (
        <NavLink to='/login'>
          <p className='text-sm font-semibold dark:text-slate-50'>Login</p>
        </NavLink>
      )}
    </div>
  )
}


