import { useOptionalUser } from '~/utils/utilities'
import { Button, Divider, Drawer, Text } from '@mantine/core'
import { BrandIcon } from '../icons'
import { Form, Link, NavLink } from '@remix-run/react'
import Footer from './footer'
import React from 'react'
import { ChevronDownIcon, ChevronRightIcon, HamburgerMenuIcon } from '@radix-ui/react-icons'

export default function Layout({ children }: { children: React.ReactNode }) {
  const user = useOptionalUser()

  const [open, setOpen] = React.useState(false)
  const [sideBar, setSideBar] = React.useState(true)
  return (
    <div className='flex h-screen w-full flex-col items-center'>
      <div className='flex w-full flex-row items-center justify-around px-5 py-5 md:px-10 md:py-10'>

        <div className='h-20 w-20'>
          <BrandIcon />
        </div>
        <div className='text-xl font-bold md:text-5xl '>
          Derick Hoskinson PhD
        </div>

        <div className='flex flex-col items-center gap-1 md:hidden'>
          <Drawer
            opened={open}
            onClose={() => setOpen(false)}
            title='Menu'
            padding='xl'
            size='lg'
            position='top'
            transition='slide-down'
            transitionDuration={450}
            transitionTimingFunction='ease'
          >

            <div className='flex flex-col items-center md:flex-row'>
              <NavLink prefetch='intent' to='/' onClick={() => setOpen(!open)}>
                <Text>Home</Text>
              </NavLink>
              <NavLink
                prefetch='intent'
                to='/blog'
                onClick={() => setOpen(!open)}
              >
                <Text>Blog</Text>
              </NavLink>
              <NavLink
                prefetch='intent'
                to='/about'
                onClick={() => setOpen(!open)}
              >
                <Text>About</Text>
              </NavLink>
              <NavLink
                prefetch='intent'
                to='/projects'
                onClick={() => setOpen(!open)}
              >
                <Text>Projects</Text>
              </NavLink>
              <NavLink
                prefetch='intent'
                to='/travel'
                onClick={() => setOpen(!open)}
              >
                <Text>Travel</Text>
              </NavLink>
              <NavLink
                prefetch='intent'
                to='/users'
                onClick={() => setOpen(!open)}
              >
                <Text>Users</Text>
              </NavLink>

              {user ? (
                <Form method='post' action='/logout'>
                  <button type='submit'>Logout</button>
                </Form>
              ) : (
                <Link to='/login'>Login</Link>
              )}
            </div>
          </Drawer>

        </div>


      </div>
      <div className='mx-auto hidden items-center gap-5 md:flex md:flex-row'>
        <NavLink prefetch='intent' to='/' onClick={ () => setOpen(false) }>
          <h3
            className='text-xl font-semibold md:text-3xl'
          >Home</h3>
        </NavLink>
        <NavLink prefetch='intent' to='/blog' onClick={ () => setOpen(false) }>
          <h3
          className='text-xl font-semibold md:text-3xl'
          >Blog</h3>
        </NavLink>
        <NavLink prefetch='intent' to='/about' onClick={ () => setOpen(false) }>
          <h3
          className='text-xl font-semibold md:text-3xl'
          >About</h3>
        </NavLink>
        <NavLink
          prefetch='intent'
          to='/projects'
          onClick={ () => setOpen(false) }
        >
          <h3
          className='text-xl font-semibold md:text-3xl'
          >Projects</h3>
        </NavLink>


        <NavLink
          prefetch='intent'
          to='/travel'
          onClick={ () => setOpen(false) }
        >
          <h3
          className='text-xl font-semibold md:text-3xl'
          >Travel</h3>
        </NavLink>
        <NavLink prefetch='intent' to='/users' onClick={ () => setOpen(false) }>
          <h3
          className='text-xl font-semibold md:text-3xl'
          >Users</h3>
        </NavLink>

        { user ? (
          <Form method='post' action='/logout'>
            <button
              className='text-xl font-semibold md:text-3xl'

            type='submit'>Logout</button>
          </Form>
        ) : (
          <Link
              className='text-xl font-semibold md:text-3xl'

          to='/login'>Login</Link>
        ) }

      </div>
      <Button
        color='teal'
        variant='subtle'
        className='block md:hidden'
        onClick={ () => setOpen(!open) }
      >
        <HamburgerMenuIcon />
      </Button>
     <div className='flex flex-row items-center w-full'>



        <div className='mt-1 flex h-full w-[250px] md:w-3/4 grow flex-col gap-5 overflow-asuto'>
          { children }
      </div>
      </div>
      <Footer />
    </div>
  )
}
