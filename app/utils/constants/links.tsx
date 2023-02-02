import { Form } from '@remix-run/react'
import {
  IconFilePencil,
  IconLogin,
  IconLogout,
  IconPencilPlus,
  IconUserCircle
} from '@tabler/icons'

export const siteLinks = [
  { name: 'Home', href: '/', icon_name: 'home' },
  { name: 'Blog', href: '/blog', icon_name: 'feed' },
  { name: 'About', href: '/about', icon_name: 'person' },
  { name: 'Projects', href: '/projects', icon_name: 'code' },
  { name: 'Travel', href: '/travel', icon_name: 'airplanemode_active' }
]

export const nonUserLinks = [
  { text: 'Login', link: '/login', children: <IconLogin /> },
  { text: 'Register', link: '/register', children: <IconUserCircle /> }
]
