import React from 'react'
import {
  ExitIcon,
  FileTextIcon,
  HomeIcon,
  MixIcon,
  Pencil1Icon,
  PlusCircledIcon,
  ReaderIcon,
  RulerSquareIcon
} from '@radix-ui/react-icons'
import { Form, Link, NavLink } from '@remix-run/react'
import { BrandIcon } from '../icons'
import { socialLinks } from '~/utils/constants/social-links'
import Button from './button'
import Divider from '../divider'
import { useOptionalUser } from '~/utils/utilities'

export default function Layout({ children }: { children: React.ReactNode }) {
  const user = useOptionalUser()
  const activeStyle = {
    textDecoration: 'underline'
  }
  return (
    <>
      <div className='flex h-full flex-col text-slate12'>
        <nav className='flex flex-row items-center justify-around'>
          <div className='h-20 w-20'>
            <BrandIcon />
          </div>
          <div className='md:h4 h4 '>Derick Hoskinson PhD</div>
        </nav>
        <div className='mx-4 flex w-full flex-col gap-4 md:flex-row'>
          <div className='flex w-full flex-row flex-wrap items-center overflow-hidden  md:w-1/5 md:flex-col'>
            <div className='hidden md:block'>
              <h6 className='h6 italic text-slate12'>Home</h6>

              <Divider my={'2'} />
            </div>
            <NavLink
              to='/home'
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              className='flex flex-row justify-between text-slate12'
            >
              <Button variant='unfilled' size='small'>
                Home
                <HomeIcon />
              </Button>
            </NavLink>
            <NavLink
              to='/blog'
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              className='flex flex-row justify-between text-slate12 '
            >
              <Button variant='unfilled' size='small'>
                Blog
                <ReaderIcon />
              </Button>
            </NavLink>
            <div className='hidden md:block'>
              <h6 className='h6 italic text-slate12'>Career Links</h6>

              <Divider my={'2'} />
            </div>
            <NavLink
              to='/projects'
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              className='flex flex-row justify-between text-slate12'
            >
              <Button variant='unfilled' size='small'>
                Projects
                <RulerSquareIcon />
              </Button>
            </NavLink>
            <NavLink
              to='/cv'
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              className='flex flex-row justify-between text-slate12'
            >
              <Button variant='unfilled' size='small'>
                CV
                <FileTextIcon />
              </Button>
            </NavLink>

            {user?.role === 'ADMIN' && (
              <>
                <div className='hidden md:block'>
                  <h6 className='h6 italic text-slate12'>Admin Links</h6>

                  <Divider my={'2'} />
                </div>{' '}
                <NavLink
                  to='/blog/new'
                  style={({ isActive }) => (isActive ? activeStyle : undefined)}
                  className='flex flex-row justify-between text-slate12'
                >
                  <Button variant='unfilled' size='small'>
                    <PlusCircledIcon />
                    Create
                  </Button>
                </NavLink>
                <NavLink
                  to='/drafts'
                  style={({ isActive }) => (isActive ? activeStyle : undefined)}
                  className='flex flex-row justify-between text-slate12'
                >
                  <Button variant='unfilled' size='small'>
                    <Pencil1Icon />
                    Drafts
                  </Button>
                </NavLink>
                <NavLink
                  to='/categories'
                  style={({ isActive }) => (isActive ? activeStyle : undefined)}
                  className='flex flex-row justify-between text-slate12'
                >
                  <Button variant='unfilled' size='small'>
                    <MixIcon />
                    Categories
                  </Button>
                </NavLink>
              </>
            )}
            <div className='hidden md:block'>
              <Divider my={'2'} />
            </div>

            {user ? (
              <Form method='post' action='/logout'>
                <Button
                  type='submit'
                  variant='unfilled'
                  size='small'
                  className='flex flex-row justify-between text-slate12'
                >
                  Logout
                  <ExitIcon />
                </Button>
              </Form>
            ) : (
              <Link to='/login'>Login</Link>
            )}
          </div>
          <main className=' mx-auto flex h-full w-full flex-grow flex-col justify-center md:flex-row'>
            {children}
          </main>
        </div>
      </div>

      <footer className='flex flex-row items-center justify-center gap-4'>
        <p className='p'>Copyrite {new Date().getFullYear()}</p>
        {/* map through social links array  */}
        {socialLinks.map((social) => (
          <a
            key={social.name}
            href={social.href}
            target='_blank'
            rel='noopener noreferrer'
          >
            {social.icon}
          </a>
        ))}
      </footer>
    </>
  )
}
