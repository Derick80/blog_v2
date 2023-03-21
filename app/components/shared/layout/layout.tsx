import { useOptionalUser } from '~/utils/utilities'
import { Button, Divider, Drawer, Text } from '@mantine/core'
import { BrandIcon } from '../icons'
import { Form, Link, NavLink } from '@remix-run/react'
import Footer from './footer'
import React from 'react'
import {
  ChevronDownIcon,
  ChevronRightIcon,
  HamburgerMenuIcon
} from '@radix-ui/react-icons'
import { motion } from 'framer-motion'

export default function Layout({ children }: { children: React.ReactNode }) {
  const user = useOptionalUser()

  const [open, setOpen] = React.useState(false)
  return (
    <div className='flex h-screen w-full flex-col items-center'>
      <div className='flex w-full flex-row items-center justify-around px-5 py-5 md:px-10 md:py-10'>
        <div className='h-20 w-20'>
          <BrandIcon />
        </div>
        <div className='text-xl font-bold md:text-5xl '>
          Derick Hoskinson PhD
        </div>
        <div className='hidden flex-col items-center gap-5 md:flex md:flex-row'>
          <NavLink prefetch='intent' aria-label='Go to Home' to='/'>
            <h3 className='font-semibold'>Home</h3>
          </NavLink>
          <NavLink prefetch='intent' aria-label='Go to Blog' to='/blog'>
            <h3 className='font-semibold'>Blog</h3>
          </NavLink>
          <NavLink prefetch='intent' aria-label='Go to About' to='/about'>
            <h3 className='font-semibold'>About</h3>
          </NavLink>
          <NavLink prefetch='intent' aria-label='Go to Projects' to='/projects'>
            <h3 className='font-semibold'>Projects</h3>
          </NavLink>
          <NavLink prefetch='intent' aria-label='Go to Travel' to='/travel'>
            <h3 className='font-semibold'>Travel</h3>
          </NavLink>
          {/* <NavLink prefetch='intent'
            aria-label='Go to Users'
          to='/users'
          >
            <h3 className='font-semibold'>Users</h3>
          </NavLink> */}

          {user ? (
            <Form method='post' action='/logout'>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                type='submit'
              >
                Logout
              </motion.button>
            </Form>
          ) : (
            <Link to='/login'>Login</Link>
          )}
        </div>
        <button
          className='block text-crimson9 md:hidden'
          onClick={() => setOpen(!open)}
        >
          <HamburgerMenuIcon />
        </button>
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
            <div className='flex flex-col items-center gap-5 md:flex-row'>
              <NavLink
                prefetch='intent'
                aria-label='Go to Home'
                to='/'
                onClick={() => setOpen(!open)}
              >
                <h3 className='font-semibold'>Home</h3>
              </NavLink>
              <NavLink
                prefetch='intent'
                aria-label='Go to Blog'
                to='/blog'
                onClick={() => setOpen(!open)}
              >
                <h3 className='font-semibold'>Blog</h3>
              </NavLink>
              <NavLink
                prefetch='intent'
                aria-label='Go to About'
                to='/about'
                onClick={() => setOpen(!open)}
              >
                <h3 className='font-semibold'>About</h3>
              </NavLink>
              <NavLink
                prefetch='intent'
                aria-label='Go to Projects'
                to='/projects'
                onClick={() => setOpen(!open)}
              >
                <h3 className='font-semibold'>Projects</h3>
              </NavLink>
              <NavLink
                prefetch='intent'
                to='/travel'
                onClick={() => setOpen(!open)}
              >
                <h3 className='font-semibold'>Travel</h3>
              </NavLink>
              <NavLink
                prefetch='intent'
                aria-label='Go to Users'
                to='/users'
                onClick={() => setOpen(!open)}
              >
                <h3 className='font-semibold'>Users</h3>
              </NavLink>

              {user ? (
                <Form method='post' action='/logout'>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    type='submit'
                  >
                    Logout
                  </motion.button>
                </Form>
              ) : (
                <Link to='/login'>Login</Link>
              )}
            </div>
          </Drawer>
        </div>
      </div>

      <div className='flex w-full flex-row items-center'>
        <div className='mt-1 flex h-full w-[250px] grow flex-col gap-5 md:w-3/4'>
          {children}
        </div>
      </div>
      <Footer />
    </div>
  )
}
