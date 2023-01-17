import { Group, Menu, ActionIcon } from '@mantine/core'
import { DotsVerticalIcon } from '@radix-ui/react-icons'
import { Form, NavLink } from '@remix-run/react'
import {
  IconDotsVertical,
  IconEdit,
  IconFileMinus,
  IconTrash
} from '@tabler/icons'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../button'
import { Dialog } from '../layout/dialog'
import { Modal } from '../layout/modal'

export type OptionProps = {
  id: string
  published: boolean | null | undefined
}
export default function PostOptions({ id, published }: OptionProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Group noWrap spacing={0}>
      <Menu transition='pop' position='bottom-end'>
        <Menu.Target>
          <ActionIcon variant='filled' size={36}>
            <IconDotsVertical size={20} stroke={1.5} />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          {published ? (
            <Menu.Item icon={<IconFileMinus size={16} stroke={1.5} />}>
              <Form
                name='unpublish'
                method='post'
                className='border-transparent flex w-full items-center space-x-1.5 rounded bg-crimson6 p-2 px-3 py-2 text-sm font-medium leading-4 shadow-sm'
                action={`/blog/${id}/publish`}
              >
                <button type='submit' name='_action' value='unpublish'>
                  Unpublish
                </button>
              </Form>
            </Menu.Item>
          ) : (
            <>
              <Form
                name='publish'
                method='post'
                className='border-transparent flex w-full items-center space-x-1.5 rounded bg-crimson6 p-2 px-3 py-2 text-sm font-medium leading-4 shadow-sm'
                action={`/blog/${id}/publish`}
              >
                <button type='submit' name='_action' value='publish'>
                  publish
                </button>
              </Form>
            </>
          )}
          <Menu.Item icon={<IconEdit size={16} stroke={1.5} />}>
            <NavLink
              className='border-transparent flex w-full items-center space-x-1.5 rounded bg-crimson6 p-2 px-3 py-2 text-sm font-medium leading-4 shadow-sm'
              to={`/blog/${id}/edit`}
            >
              <p>Edit</p>
            </NavLink>
          </Menu.Item>
          <Menu.Item icon={<IconTrash size={16} stroke={1.5} />}>
            <Form
              className='border-transparent flex w-full items-center space-x-1.5 rounded border bg-crimson6 p-2 px-3 py-2 text-sm font-medium leading-4 shadow-sm'
              method='post'
              action={`/blog/${id}/publish`}
            >
              <button type='submit' name='_action' value='delete'>
                Delete
              </button>
            </Form>
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  )
}
