import {
  ChevronDownIcon,
  Cross2Icon,
  ExitIcon,
  FileTextIcon,
  GlobeIcon,
  HamburgerMenuIcon,
  HomeIcon,
  MixIcon,
  Pencil1Icon,
  PersonIcon,
  PlusCircledIcon,
  RocketIcon,
  RulerSquareIcon
} from '@radix-ui/react-icons'
import { Form, Link, NavLink } from '@remix-run/react'
import { motion } from 'framer-motion'
import React, { useEffect } from 'react'
import { useOptionalUser } from '~/utils/utilities'
import StatsCard from '../blog-ui/stats-card'
import Divider from '../divider'
import { allLinks } from './link-arrays'

const linksByCategory = allLinks.reduce(
  (acc: Record<string, typeof allLinks>, link: (typeof allLinks)[0]) => {
    if (!acc[link.category]) {
      acc[link.category] = []
    }
    acc[link.category].push(link)
    return acc
  },
  {}
)

export default function SideBar({ status }: { status: boolean }) {
  const user = useOptionalUser()
  const activeStyle = {
    textDecoration: 'underline'
  }
  console.log(status)

  const [open, setOpen] = React.useState(status)

  console.log(open)
  React.useEffect(() => {
    setOpen(status)
  }, [status])
  const shifty = open ? '-translate-x-[250px]' : ' md:hidden translate-x-full'

  return (
    <div>
      <div
        className={`absolute z-10  mt-4 flex h-fit flex-col rounded-l-2xl rounded-r-2xl bg-crimson3 p-1 text-slate-50 delay-150 duration-500 ease-in-out peer-focus:left-0 ${shifty}`}
      >
        <div className='flex flex-col gap-2 text-slate-50'>
          {/* <div className='flex items-center justify-start'>
            <button className='btn primary ' onClick={() => setOpen(!open)}>
              <Cross2Icon />
            </button>
          </div> */}
          <h6 className='h6 italic text-slate-50'>Primary Links</h6>
          <Divider my={'2'} isSidebar={true} />
          <NavLink
            to='/blog'
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
            className='flex items-center justify-start gap-2 p-2'
            onClick={() => {
              setOpen(false)
            }}
          >
            <FileTextIcon />
            <p className='p text-slate-50'>Blog Feed</p>
          </NavLink>
          <NavLink
            to='/about'
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
            className='flex items-center justify-start gap-2 p-2'
            onClick={() => {
              setOpen(false)
            }}
          >
            <PersonIcon />
            <p className='p text-slate-50'>About</p>
          </NavLink>
        </div>

        <h6 className='h6 italic text-slate-50'>Personal Links</h6>
        <Divider my={'2'} isSidebar={true} />
        <NavLink
          to='/travel'
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
          className='flex items-center justify-start gap-2 p-2'
          onClick={() => {
            setOpen(false)
          }}
        >
          <RocketIcon />
          <p className='p text-slate-50'>Travel</p>
        </NavLink>
        <NavLink
          to='/books'
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
          className='flex items-center justify-start gap-2 p-2'
          onClick={() => {
            setOpen(false)
          }}
        >
          <GlobeIcon />
          <p className='p text-slate-50'>Book Reviews</p>
        </NavLink>

        <h6 className='h6 italic text-slate-50'>Career Links</h6>
        <Divider my={'2'} isSidebar={true} />
        <NavLink
          to='/projects'
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
          className='flex items-center justify-start gap-2 p-2'
          onClick={() => {
            setOpen(false)
          }}
        >
          <RulerSquareIcon />
          <p className='p text-slate-50'>Projects</p>
        </NavLink>
        <NavLink
          to='/cv'
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
          className='flex items-center justify-start gap-2 p-2'
          onClick={() => {
            setOpen(false)
          }}
        >
          <FileTextIcon />
          <p className='p text-slate-50'>Curriculum Vitae</p>
        </NavLink>

        {user?.role === 'ADMIN' && (
          <>
            <h6 className='h6 italic text-slate-50'>Admin Links</h6>
            <Divider my={'2'} isSidebar={true} />
            <NavLink
              to='/blog/new'
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              className='flex items-center justify-start gap-2 p-2'
              onClick={() => {
                setOpen(false)
              }}
            >
              <PlusCircledIcon />
              <p className='p text-slate-50'>New Post</p>
            </NavLink>
            <NavLink
              to='/drafts'
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              className='flex items-center justify-start gap-2 p-2'
              onClick={() => {
                setOpen(false)
              }}
            >
              <Pencil1Icon />
              <p className='p text-slate-50'>Drafts</p>
            </NavLink>
            <NavLink
              to='/categories'
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              className='flex items-center justify-start gap-2 p-2'
              onClick={() => {
                setOpen(false)
              }}
            >
              <MixIcon />
              <p className='p text-slate-50'>Categories</p>
            </NavLink>
          </>
        )}
        <div className='flex w-full items-center justify-center'>
          <StatsCard />
        </div>

        {user ? (
          <Form method='post' action='/logout'>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              type='submit'
              className='btn-link flex items-center gap-2 text-slate-50'
            >
              Logout
              <ExitIcon />
            </motion.button>
          </Form>
        ) : (
          <Link to='/login'>Login</Link>
        )}
      </div>
    </div>
  )
}
