import { PlusIcon, PencilSquareIcon, ArrowsRightLeftIcon, ArrowRightOnRectangleIcon, UserCircleIcon } from '@heroicons/react/24/outline'
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
  { name: 'Login', href: '/login', icon_name: 'login' },
  { name: 'Register', href: '/register', icon_name: 'person_add' }
]

// can probably remove this type of link and just use the nonUserLinks
export const userLinks = [
  { name: 'Users', href: '/users', icon_name: 'person' }
]
export const adminLinks = [
  { text: 'New post', link: '/blog/new', children: <PlusIcon className='rounded-full' /> },
  {
    text: 'Drafts',
    link: '/blog/drafts',
    children: <PencilSquareIcon className='rounded-full' />
  },
  {text: 'Preferences', link: '/preferences', children: <UserCircleIcon className='rounded-full' />},
  {text: 'Admin', link: '/admin', children: <ColorMode />},
  {text: 'Logout' , link: '/logout', children: <ArrowRightOnRectangleIcon className='rounded-full' />}
]
