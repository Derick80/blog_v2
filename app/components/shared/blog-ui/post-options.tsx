import { Button } from '@mantine/core'
import { Pencil1Icon } from '@radix-ui/react-icons'
import { NavLink } from '@remix-run/react'

export type OptionProps = {
  postId: string
}
export default function PostOptions({ postId }: OptionProps) {
  return (
    <NavLink to={`/blog/${postId}/edit`}>
      <button className='text-blue-500'>
        <Pencil1Icon />
      </button>
    </NavLink>
  )
}
