import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Cross1Icon,
  ExitIcon,
  FileTextIcon,
  GlobeIcon,
  MixIcon,
  Pencil1Icon,
  PersonIcon,
  PlusCircledIcon,
  RocketIcon,
  RulerSquareIcon,
  StarFilledIcon,
  StarIcon
} from '@radix-ui/react-icons'
import { json } from '@remix-run/node'
import { Form, Link, NavLink, useLoaderData } from '@remix-run/react'
import { motion } from 'framer-motion'
import React from 'react'
import BlogNav from '~/components/shared/blog-ui/blog-admin-menu'
import { isAuthenticated } from '~/utils/server/auth/auth.server'
import { useOptionalUser } from '~/utils/utilities'

export async function loader({ request }: { request: Request }) {
  const user = await isAuthenticated(request)

  if (!user) {
    return json({ error: 'Not authenticated' }, { status: 401 })
  }

  return json({ user }, { status: 200 })
}

export default function BetaRoute() {
  const user = useOptionalUser()
  const data = useLoaderData()
  const [open, setOpen] = React.useState(false)

  return (
    <div className='items-censter flex-start flex h-screen w-full bg-purple-500'>
      <Sidebar>
        <MainLink />
        <PersonalLinks />
        <CareerLinks />
        {user?.role === 'ADMIN' && <AdminMenu />}
        {user ? (
          <Form method='post' action='/logout'>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              type='submit'
              className='btn-link flex items-center gap-2'
            >
              Logout
              <ExitIcon />
            </motion.button>
          </Form>
        ) : (
          <Link to='/login'>Login</Link>
        )}
      </Sidebar>
    </div>
  )
}

export const SiteNavLinks = [
  {
    name: 'Blog',
    href: 'blog',
    icon: <FileTextIcon />
  },
  {
    name: 'About',
    href: '/about',
    icon: <PersonIcon />
  },
  {
    name: 'Beta',
    href: '/beta',
    icon: <ChevronDownIcon />
  }
]

export function MainLink() {
  const activeStyle = {
    textDecoration: 'underline'
  }
  return (
    <div className='flex flex-col gap-2'>
      <h6 className='h6'>Primary Links</h6>
      {SiteNavLinks.map((item) => (
        <NavLink
          key={item.name}
          to={item.href}
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
          className='flex items-center justify-start gap-2 p-2'
        >
          {item.icon}
          <p className='subtitle2'>{item.name}</p>
        </NavLink>
      ))}
    </div>
  )
}
export function PersonalLinks() {
  const personalLinkArray = [
    {
      name: 'About',
      href: '/about',
      icon: <PersonIcon />
    },
    {
      name: 'Travel',
      href: '/travel',
      icon: <RocketIcon />
    },
    {
      name: 'Book Reviews',
      href: '/books',
      icon: <GlobeIcon />
    }
  ]
  const activeStyle = {
    textDecoration: 'underline'
  }
  return (
    <div className='flex flex-col gap-2'>
      <h6 className='h6'>Primary Links</h6>
      {personalLinkArray.map((item) => (
        <NavLink
          key={item.name}
          to={item.href}
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
          className='flex items-center justify-start gap-2 p-2'
        >
          {item.icon}
          <p className='h6'>{item.name}</p>
        </NavLink>
      ))}
    </div>
  )
}

export function CareerLinks() {
  const careerLinkArray = [
    {
      category: 'Career',
      name: 'Projects',
      href: '/projects',
      icon: <RulerSquareIcon />
    },
    {
      category: 'Career',
      name: 'Curriculum Vitae',
      href: '/cv',
      icon: <FileTextIcon />
    }
  ]
  const activeStyle = {
    textDecoration: 'underline'
  }

  return (
    <div className='flex flex-col gap-2'>
      <h6 className='h6'>Career Links</h6>
      {careerLinkArray.map((item) => (
        <NavLink
          key={item.name}
          to={item.href}
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
          className='flex items-center justify-start gap-2 p-2'
        >
          {item.icon}
          <p className='p'>{item.name}</p>
        </NavLink>
      ))}
    </div>
  )
}

export function AdminMenu() {
  const adminMenuLinkArray = [
    {
      category: 'Admin',
      name: 'New',
      href: '/blog/new',
      icon: <PlusCircledIcon />
    },
    {
      category: 'Admin',
      name: 'Drafts',
      href: '/drafts',
      icon: <Pencil1Icon />
    },
    {
      category: 'Admin',
      name: 'Categories',
      href: '/categories',
      icon: <MixIcon />
    }
  ]
  const activeStyle = {
    textDecoration: 'underline'
  }

  return (
    <div className='flex flex-col gap-2'>
      <h6 className='h6'>Admin Links</h6>
      {adminMenuLinkArray.map((item) => (
        <NavLink
          key={item.name}
          to={item.href}
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
          className='flex items-center justify-start gap-2 p-2'
        >
          {item.icon}
          <p className='p'>{item.name}</p>
        </NavLink>
      ))}
    </div>
  )
}
export function Sidebar({ children }: { children: React.ReactNode }) {
  return (
    <div className='mx-auto flex h-full w-[250px] flex-col items-center gap-2 bg-crimson8 p-4 '>
      {children}
    </div>
  )
}
