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
