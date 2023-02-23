import { Menu, Button, Text } from '@mantine/core'
import {
  ChevronDownIcon,
  ExitIcon,
  Pencil1Icon,
  Pencil2Icon
} from '@radix-ui/react-icons'
import { Form, Link, NavLink } from '@remix-run/react'
import { useState } from 'react'
export default function Dropdown() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Menu shadow='md' width={200}>
        <Menu.Target>
          <Button variant='default'>
            <ChevronDownIcon />
          </Button>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Blog</Menu.Label>
          <Menu.Item icon={<Pencil2Icon />}>
            <NavLink
              style={{
                textDecoration: 'none',
                color: 'currentcolor'
              }}
              to='/blog/new'
              onClick={() => setOpen(!open)}
            >
              <p>New Post</p>
            </NavLink>
          </Menu.Item>
          <Menu.Item icon={<Pencil1Icon />}>
            <NavLink to='/drafts' onClick={() => setOpen(!open)}>
              <Text>Drafts</Text>
            </NavLink>
          </Menu.Item>
          <Menu.Item icon={<Pencil2Icon />}>
            <Link to='/blog/categories' onClick={() => setOpen(!open)}>
              <Text>Categories add one</Text>
            </Link>
          </Menu.Item>

          <Menu.Divider />

          <Menu.Label>Account</Menu.Label>
          <Menu.Item icon={<ExitIcon />}>
            <NavLink
              className={({ isActive }) =>
                ` ${
                  isActive
                    ? 'border-black flex space-x-2 border-b-2'
                    : 'flex flex-row items-center space-x-2'
                }`
              }
              to='/logout'
              onClick={() => setOpen(!open)}
            >
              <>
                <Form method='post' action='/logout'>
                  <Button type='submit' color={'red'}>
                    <p>Logout</p>{' '}
                  </Button>
                </Form>
              </>
            </NavLink>
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  )
}
