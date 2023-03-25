import {
  ChevronDownIcon,
  Cross2Icon,
  ExitIcon,
  FileTextIcon,
  GlobeIcon,
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
import React from 'react'
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

export function NewSideBar() {
  const activeStyle = {
    textDecoration: 'underline'
  }
  return (
    <div className='flex flex-col gap-2'>
      {Object.entries(linksByCategory).map(([category, links]) => (
        <div key={category} className='flex flex-col gap-2'>
          <h6 className='h6 italic text-slate-50'>{category}</h6>
          <Divider my={'2'} isSidebar={true}  />
          <ul className='flex flex-col gap-2'>
            {links.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.href}
                  style={({ isActive }) => (isActive ? activeStyle : undefined)}
                >
                  {link.icon}
                  <span className='ml-2'>{link.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default function SideBar() {
  const user = useOptionalUser()
  const activeStyle = {
    textDecoration: 'underline'
  }

  const [open, setOpen] = React.useState(false)
  const shifty = open ? 'translate-x-[]' : ' -translate-x-full'
  const buttonShift = open ? 'translate-x-[195px]' : ' translate-x-[]'

  console.log(buttonShift, 'buttonShift')

  return (
    <div>
      <button
        className={`right- absolute top-0 z-50 btn-primary bg-crimson9 delay-150 duration-300 ease-in-out peer-focus:left-0 border-none focus:ring-0 ${buttonShift}`}
        onClick={() => setOpen(!open)}
      >
        {open ? <Cross2Icon /> : <h3 className='h3 text-slate-50'>Menu</h3>}
      </button>
      <div
        className={`absolute z-10 flex h-full w-[250px] flex-col text-slate-50 overflow-scroll rounded-r-3xl rounded-l-sm bg-crimson3 p-2 delay-150 duration-300 ease-out peer-focus:left-0 ${shifty}`}
      >
        <div className='flex flex-col gap-2 text-slate-50'>
          <h6 className='h6 italic text-slate-50'>Primary Links</h6>
          <Divider my={'2'} isSidebar={true}  />
          <NavLink
            to='/blog'
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
            className='flex items-center justify-start gap-2 p-2'
            onClick={() => {
              setOpen(false)
            }}
          >
            <FileTextIcon />
            <p className='p text-slate-50'>Home</p>
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
        <Divider my={'2'} isSidebar={true}  />
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
        <Divider my={'2'} isSidebar={true}  />
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
            <Divider my={'2'} isSidebar={true}  />
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
        <StatsCard />

        {user ? (
          <Form method='post' action='/logout'>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              type='submit'
              className='btn-link text-slate-50 flex items-center gap-2'
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
