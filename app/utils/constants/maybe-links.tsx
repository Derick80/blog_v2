import {
  FileTextIcon,
  PersonIcon,
  ChevronDownIcon,
  GlobeIcon,
  RocketIcon
} from '@radix-ui/react-icons'

export const maybeLinks = [
  {
    category: 'blog',
    name: 'Blog',
    href: 'blog',
    icon: <FileTextIcon />
  },
  {
    category: 'Blog',
    name: 'Beta',
    href: '/beta',
    icon: <ChevronDownIcon />
  },
  {
    category: 'Personal',
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
