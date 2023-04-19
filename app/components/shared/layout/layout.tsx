import React from 'react'
import {
  ExitIcon,
  MixIcon,
  Pencil1Icon,
  PlusCircledIcon,
  RocketIcon
} from '@radix-ui/react-icons'
import { Form, Link, NavLink } from '@remix-run/react'
import { socialLinks } from '~/utils/constants/social-links'
import Button from '../button'
import { useOptionalUser } from '~/utils/utilities'
import { Menu } from '@mantine/core'
import { IconBook2 } from '@tabler/icons-react'
import UserDropdown from '../user-ui/user-dropdown'

export default function Layout({ children }: { children: React.ReactNode }) {
  const user = useOptionalUser()

  return (
    <div className='flex flex-col items-center gap-4 '>
      <nav className='flex flex-row items-center gap-4'>
        <div>
          <MantineMenu />
        </div>
        <HobbiesMenu />
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
    <Menu withArrow trigger='hover' shadow='md' width={150}>
      <Menu.Target>
        <Button variant='icon_unfilled' className='font-bold' size='small'>
          {' '}
          Blog
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Blog Menu</Menu.Label>
        <Menu.Item icon={<IconBook2 />}>
          <NavLink to='/blog'>Blog</NavLink>
        </Menu.Item>
        <Menu.Item icon={<PlusCircledIcon />}>
          <NavLink to='/blog/new'>Create</NavLink>
        </Menu.Item>
        <Menu.Item icon={<Pencil1Icon />}>
          <NavLink to='/drafts'>Drafts</NavLink>
        </Menu.Item>
        <Menu.Item icon={<MixIcon />}>
          <Link to='/categories/new'>Categories</Link>
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

function HobbiesMenu() {
  return (
    <Menu trigger='hover' shadow='md' width={150} withArrow>
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
