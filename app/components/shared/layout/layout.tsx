import React from 'react'
import {
  ExitFullScreenIcon,
  ExitIcon,
  GearIcon,
  MixIcon,
  Pencil1Icon,
  PlusCircledIcon,
  RocketIcon
} from '@radix-ui/react-icons'
import { Form, Link, NavLink } from '@remix-run/react'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { CaretDownIcon } from '@radix-ui/react-icons'
import { socialLinks } from '~/utils/constants/social-links'
import Button from '../button'
import { useOptionalUser } from '~/utils/utilities'
import { Menu } from '@mantine/core'
import { IconBook2 } from '@tabler/icons-react'
import UserDropdown from '../user-ui/user-dropdown'

export default function Layout({ children }: { children: React.ReactNode }) {
  const user = useOptionalUser()
  const activeStyle = {
    textDecoration: 'underline'
  }
  return (
    <div className='flex flex-col items-center gap-4'>
      <nav className='flex flex-row items-center gap-4'>
        <MantineMenu />
        <ProjectsMenu />
        <NavLink
          to='/projects'
          className={({ isActive }) => {
            return isActive ? ' text-gray-900 underline' : ' text-gray-900'
          }}
        >
          <Button variant='icon_unfilled' size='small'>
            Projects
          </Button>
        </NavLink>

        {user && <UserDropdown user={user} />}
      </nav>

      <main className='mx-auto flex flex-col items-center gap-4'>
        <div className='flex w-full flex-col items-center  md:w-1/5'>
          {/* {user?.role === 'ADMIN' && (
            <ul className='flex flex-col items-center gap-4 p-2'>
              <li className='flex flex-row items-center gap-4 p-2'>
                <NavLink
                  to='/blog/new'
                  style={({ isActive }) => (isActive ? activeStyle : undefined)}
                  className='flex flex-row justify-between text-slate12'
                >
                  <Button variant='primary_filled' size='small'>
                    <PlusCircledIcon />
                    Create
                  </Button>
                </NavLink>
                <NavLink
                  to='/drafts'
                  style={({ isActive }) => (isActive ? activeStyle : undefined)}
                  className='flex flex-row justify-between text-slate12'
                >
                  <Button variant='primary_filled' size='small'>
                    <Pencil1Icon />
                    Drafts
                  </Button>
                </NavLink>
                <NavLink
                  to='/categories'
                  style={({ isActive }) => (isActive ? activeStyle : undefined)}
                  className='flex flex-row justify-between text-slate12'
                >
                  <Button variant='primary_filled' size='small'>
                    <MixIcon />
                    Categories
                  </Button>
                </NavLink>
              </li>
            </ul>
          )} */}
        </div>
        {children}
      </main>

      <footer className='flex flex-col items-center gap-4'>
        <div className='flex flex-row items-center gap-4'>
          {socialLinks.map((link) => (
            <Link key={link.href} to={link.href}>
              {link.icon}
            </Link>
          ))}
          <p>© {new Date().getFullYear()} Derick Hoskinson</p>
          {user && (
            <Form method='post' action='/logout'>
              <Button type='submit' variant='danger_filled' size='small'>
                <ExitIcon />
                <p>Logout</p>
              </Button>
            </Form>
          )}
        </div>
      </footer>
    </div>
  )
}

function MantineMenu() {
  return (
    <Menu trigger='hover' shadow='md' width={150}>
      <Menu.Target>
        <Button variant='icon_unfilled' className='font-bold' size='small'>
          {' '}
          Blog
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Blog Menu</Menu.Label>
        <Menu.Item icon={<PlusCircledIcon />}>
          <Link to='/blog/new'>Create</Link>
        </Menu.Item>
        <Menu.Item icon={<Pencil1Icon />}>
          <Link to='/drafts'>Drafts</Link>
        </Menu.Item>
        <Menu.Item icon={<MixIcon />}>
          <Link to='/categories'>Categories</Link>
        </Menu.Item>

        <Menu.Divider />

        <Menu.Label>Danger zone</Menu.Label>

        <Menu.Item color='red'>
          <Form method='post' action='/logout'>
            <Button type='submit' variant='danger_filled' size='small'>
              <ExitIcon />
              <p>Logout</p>
            </Button>
          </Form>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}
function RadixNavMenu() {
  return (
    <NavigationMenu.Root>
      <NavigationMenu.List>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger />
          <NavigationMenu.Content>
            <NavigationMenu.Link />
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Link />
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Trigger>
            <NavigationMenu.Link>Blog</NavigationMenu.Link>
          </NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <NavigationMenu.Sub>
              <NavigationMenu.List />
              <NavigationMenu.Viewport />
            </NavigationMenu.Sub>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Indicator />
      </NavigationMenu.List>

      <NavigationMenu.Viewport />
    </NavigationMenu.Root>
  )
}
function ProjectsMenu() {
  return (
    <Menu trigger='hover' shadow='md' width={150}>
      <Menu.Target>
        <Button variant='icon_unfilled' className='font-bold' size='small'>
          {' '}
          Hobbies
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Hobbies Menu</Menu.Label>
        <Menu.Item icon={<RocketIcon />}>
          <Link to='/travel'>Travel</Link>
        </Menu.Item>
        <Menu.Item icon={<IconBook2 />}>
          <Link to='/books'>Books</Link>
        </Menu.Item>
        <Menu.Item icon={<MixIcon />}>
          <Link to='/categories'>Categories</Link>
        </Menu.Item>

        <Menu.Divider />

        <Menu.Label>Danger zone</Menu.Label>

        <Menu.Item color='red'>
          <Form method='post' action='/logout'>
            <Button type='submit' variant='danger_filled' size='small'>
              <ExitIcon />
              <p>Logout</p>
            </Button>
          </Form>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}
