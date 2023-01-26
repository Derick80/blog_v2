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
  { name: 'Beta', href: '/beta', icon_name: 'bug_report' },
  { name: 'Travel', href: '/travel', icon_name: 'airplanemode_active' }
]

export const nonUserLinks = [
  { text: 'Login', link: '/login', children: <IconLogin /> },
  { text: 'Register', link: '/register', children: <IconUserCircle /> }
]

// can probably remove this type of link and just use the nonUserLinks
export const userLinks = [
  { name: 'Users', href: '/users', icon_name: 'person' }
]
export const adminLinks = [
  {
    text: 'New post',
    link: '/blog/new',
    children: <IconPencilPlus />
  },
  {
    text: 'Drafts',
    link: '/blog/drafts',
    children: <IconFilePencil />
  },
  {
    text: 'Logout',
    link: '/logout',
    children: (
      <>
        <Form method='post' action='/logout'>
          <button type='submit'>
            {' '}
            <IconLogout />
          </button>
        </Form>
      </>
    )
  }
]
