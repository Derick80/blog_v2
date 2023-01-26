import { Group, Menu, ActionIcon, Button } from '@mantine/core'
import { DotsVerticalIcon } from '@radix-ui/react-icons'
import { Form, NavLink } from '@remix-run/react'
import {
  IconChevronDown,
  IconDotsVertical,
  IconEdit,
  IconFileMinus,
  IconFilePlus,
  IconTrash
} from '@tabler/icons'
import { useState } from 'react'

export type OptionProps = {
  id: string
  published: boolean | null | undefined
}
export default function PostOptions({ id, published }: OptionProps) {
  const [open, setOpen] = useState(false)
  return (
    <Menu shadow='md' width={200}>
      <Menu.Target>
        <Button variant='subtle'>
          <IconDotsVertical />
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Blog Actions</Menu.Label>
        <NavLink
          style={{
            textDecoration: 'none',
            color: 'currentcolor',
            display: 'flex',
            alignItems: 'center'
          }}
          to={`/blog/${id}/edit`}
          onClick={() => setOpen(!open)}
        >
          <IconEdit />
          Edit
        </NavLink>
        <NavLink
          style={{
            textDecoration: 'none',
            color: 'currentcolor',
            display: 'flex',
            alignItems: 'center'
          }}
          to={`/blog/${id}/delete`}
          onClick={() => setOpen(!open)}
        >
          <IconTrash />
          <p>Delete</p>
        </NavLink>
        {published ? (
          <NavLink
            style={{
              textDecoration: 'none',
              color: 'currentcolor',
              display: 'flex',
              alignItems: 'center'
            }}
            to={`/blog/${id}/unpublish`}
            onClick={() => setOpen(!open)}
          >
            <IconFileMinus />
            <p>Unpublish</p>
          </NavLink>
        ) : (
          <NavLink
            style={{
              textDecoration: 'none',
              color: 'currentcolor',
              display: 'flex',
              alignItems: 'center'
            }}
            to={`/blog/${id}/publish`}
            onClick={() => setOpen(!open)}
          >
            <IconFilePlus />

            <p>Publish</p>
          </NavLink>
        )}
      </Menu.Dropdown>
    </Menu>
  )
}
