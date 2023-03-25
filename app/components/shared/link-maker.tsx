import {
  ChevronDownIcon,
  FileTextIcon,
  PersonIcon
} from '@radix-ui/react-icons'
import { NavLink } from '@remix-run/react'

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

export type LinkMakerProps = {
  link: {
    name: string
    href: string
    icon: React.ReactNode
  }

  toggle?: () => void
}

export default function LinkMaker({
  link: { name, href, icon },
  toggle
}: LinkMakerProps) {
  const activeStyle = {
    textDecoration: 'underline'
  }
  return (
    <NavLink
      key={name}
      to={href}
      onClick={toggle}
      prefetch='intent'
      className='flex'
    >
      <p className='p'>{name}</p>
      <p className='p'>{icon}</p>
    </NavLink>
  )
}
