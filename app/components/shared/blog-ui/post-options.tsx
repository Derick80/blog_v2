import { Button } from '@mantine/core'
import { Pencil1Icon } from '@radix-ui/react-icons'
import { NavLink } from '@remix-run/react'

export type OptionProps = {
  id: string
}
export default function PostOptions({ id }: OptionProps) {
  return (
    <NavLink to={`/blog/${id}/edit`}>
      <Button variant='subtle'>
        <Pencil1Icon />
      </Button>
    </NavLink>
  )
}
