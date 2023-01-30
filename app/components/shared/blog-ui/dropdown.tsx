import { Menu, Button, Text } from '@mantine/core'
import { Form, NavLink } from '@remix-run/react'
import {
  IconChevronDown,
  IconLogout,
  IconNewSection,
  IconPencilPlus
} from '@tabler/icons'
import { useState } from 'react'
export default function Dropdown() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Menu shadow='md' width={200}>
        <Menu.Target>
          <Button variant='default'>
            <IconChevronDown />
          </Button>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Blog</Menu.Label>
          <Menu.Item icon={<IconNewSection size={14} />}>
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
          <Menu.Item icon={<IconPencilPlus size={14} />}>
            <NavLink to='/drafts' onClick={() => setOpen(!open)}>
              <Text>Drafts</Text>
            </NavLink>
          </Menu.Item>


          <Menu.Divider />

          <Menu.Label>Account</Menu.Label>
          <Menu.Item icon={<IconLogout size={14} />}>
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
