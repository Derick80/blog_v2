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
}
export default function PostOptions({ id }: OptionProps) {
  return (
    <NavLink to={`/blog/${id}/edit`}>
      <Button variant='subtle'>
        <IconEdit />
      </Button>
    </NavLink>
  )
}
