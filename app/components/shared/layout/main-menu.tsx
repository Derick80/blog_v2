import { Menu, Text } from '@mantine/core'
import {
  FileTextIcon,
  GlobeIcon,
  PersonIcon,
  RocketIcon,
  RulerSquareIcon
} from '@radix-ui/react-icons'
import { Form, Link, NavLink } from '@remix-run/react'
import { motion } from 'framer-motion'
import { useOptionalUser } from '~/utils/utilities'
// this can be archived
export default function MainMenu() {
  const user = useOptionalUser()
  const activeStyle = {
    textDecoration: 'underline'
  }
  return (
    <Menu
      shadow='md'
      width={300}
      trigger='hover'
      openDelay={100}
      closeDelay={400}
    >
      <Menu.Target>
        <button className='flex flex-row items-center gap-2 rounded-md px-2 py-2 font-semibold'>
          Menu
        </button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Blog</Menu.Label>
        <Menu.Item icon={<FileTextIcon />}>
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
            aria-label='Go to Blog'
            to='/blog'
          >
            <Text>Blog</Text>
          </NavLink>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Label>Personal</Menu.Label>
        <Menu.Item icon={<PersonIcon />}>
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
            aria-label='Go to About'
            to='/about'
          >
            <Text>About</Text>
          </NavLink>
        </Menu.Item>
        <Menu.Item icon={<RocketIcon />}>
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
            aria-label='Go to Travel'
            to='/travel'
          >
            <Text>Travel</Text>
          </NavLink>
        </Menu.Item>
        <Menu.Item icon={<GlobeIcon />}>
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
            aria-label='Go to Book Reviews'
            to='/books'
          >
            <Text>Book Reviews</Text>
          </NavLink>
        </Menu.Item>

        <Menu.Divider />
        <Menu.Label>Career</Menu.Label>

        <Menu.Item icon={<RulerSquareIcon />}>
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
            aria-label='Go to Projects'
            to='/projects'
          >
            <Text>Projects</Text>
          </NavLink>
        </Menu.Item>
        <Menu.Item icon={<FileTextIcon />}>
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
            aria-label='Go to CV'
            to='/cv'
          >
            <Text>CV</Text>
          </NavLink>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Label>Other</Menu.Label>
        <Menu.Item icon={<FileTextIcon />}>
          {user ? (
            <Form method='post' action='/logout'>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                type='submit'
              >
                Logout
              </motion.button>
            </Form>
          ) : (
            <Link to='/login'>Login</Link>
          )}
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}
