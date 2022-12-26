export const siteLinks = [
  { name: 'Home', href: '/', icon_name: 'home' },
  { name: 'Blog', href: '/blog', icon_name: 'feed' },
  { name: 'About', href: '/about', icon_name: 'person' },
  { name: 'Projects', href: '/projects', icon_name: 'code' }
]

export const nonUserLinks = [
  { name: 'Login', href: '/auth/login', icon_name: 'login' },
  { name: 'Register', href: '/auth/register', icon_name: 'person_add' }

]

// can probably remove this type of link and just use the nonUserLinks
export const userLinks = [
  { name: 'Logout', href: '/auth/logout', icon_name: 'logout' }
]
