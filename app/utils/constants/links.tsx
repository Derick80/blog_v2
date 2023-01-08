import { UserCircleIcon } from '@heroicons/react/24/outline'
import {
  EnterIcon,
  ExitIcon,
  GearIcon,
  Pencil2Icon,
  PlusCircledIcon
} from '@radix-ui/react-icons'
import { Form } from '@remix-run/react'
import ColorMode from '~/components/shared/layout/color-mode'

export const siteLinks = [
  { name: 'Home', href: '/', icon_name: 'home' },
  { name: 'Blog', href: '/blog', icon_name: 'feed' },
  { name: 'About', href: '/about', icon_name: 'person' },
  { name: 'Projects', href: '/projects', icon_name: 'code' },
  { name: 'Beta', href: '/beta', icon_name: 'bug_report' },
  { name: 'Travel', href: '/travel', icon_name: 'airplanemode_active' }
]

export const nonUserLinks = [
  { text: 'Login', link: '/login', children: <EnterIcon /> },
  { text: 'Register', link: '/register', children: <UserCircleIcon /> }
]

// can probably remove this type of link and just use the nonUserLinks
export const userLinks = [
  { name: 'Users', href: '/users', icon_name: 'person' }
]
export const adminLinks = [
  {
    text: 'New post',
    link: '/blog/new',
    children: <PlusCircledIcon />
  },
  {
    text: 'Drafts',
    link: '/blog/drafts',
    children: <Pencil2Icon />
  },
  {
    text: 'Preferences',
    link: '/preferences',
    children: <GearIcon />
  },
  { text: 'Admin', link: '/admin', children: <ColorMode /> },
  {
    text: 'Logout',
    link: '/logout',
    children: (
      <>
        <Form method='post' action='/logout'>
          <button type='submit'>
            {' '}
            <ExitIcon />
          </button>
        </Form>
      </>
    )
  }
]
