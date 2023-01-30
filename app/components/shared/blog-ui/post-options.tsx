import { Group, Menu, ActionIcon, Button } from '@mantine/core'
import { DotsVerticalIcon } from '@radix-ui/react-icons'
import { Form, Link, NavLink } from '@remix-run/react'
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

       <Menu.Item>
       <Link
          style={{
            textDecoration: 'none',
            color: 'currentcolor',
            display: 'flex',
            alignItems: 'center'
          }}
          to={`/blog/${id}/edit`}
        >
          <IconEdit />
          Edit
        </Link>
       </Menu.Item>
       <Menu.Item>

       <form method="post">
  <button name="_action" type="submit" value="delete">
    Delete
  </button>
</form>
        </Menu.Item>
        {/* <Menu.Item>
        <Form
        reloadDocument
          method='post'
          action={`/blog/${id}/publish`}

        >
          <Button
            variant='subtle'
            name='_action'
            value='delete'
            >
            <IconTrash />
            Delete
            </Button>
          {published ? (
              <Button
              variant='subtle'
              style={{
                textDecoration: 'none',
                color: 'currentcolor',
                display: 'flex',
                alignItems: 'center'
              }}
              name='_action'
              value='publish'
            >
              <IconFilePlus />
              <p>Publish</p>
            </Button>

          ): (
            <Button
            variant='subtle'
            style={{
              textDecoration: 'none',
              color: 'currentcolor',
              display: 'flex',
              alignItems: 'center'
            }}
            name='_action'
            value='unpublish'
          >
            <IconFilePlus />
            <p>Publish</p>
          </Button>
          )}
        </Form>
        </Menu.Item> */}
      </Menu.Dropdown>
    </Menu>
  )

}
