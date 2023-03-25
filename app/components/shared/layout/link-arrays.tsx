import {
  FileTextIcon,
  PersonIcon,
  ChevronDownIcon,
  RocketIcon,
  GlobeIcon,
  RulerSquareIcon,
  PlusCircledIcon,
  Pencil1Icon,
  MixIcon
} from '@radix-ui/react-icons'
import { NavLink } from '@remix-run/react'
import Divider from '../divider'

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
      <h6 className='h6 italic'>Primary Links</h6>
      <Divider my={'2'} />
      {SiteNavLinks.map((item) => (
        <NavLink
          key={item.name}
          to={item.href}
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
          className='ml-10 flex items-center justify-start gap-2 p-2'
        >
          <div>{item.icon}</div>
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
      <h6 className='h6 italic'>Personal Links</h6>
      <Divider my={'2'} />

      {personalLinkArray.map((item) => (
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
      <h6 className='h6 italic'>Career Links</h6>
      <Divider my={'2'} />

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
      <h6 className='h6 italic'>Admin Links</h6>
      <Divider my={'2'} />

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
