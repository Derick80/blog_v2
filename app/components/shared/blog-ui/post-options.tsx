import { Pencil1Icon } from '@radix-ui/react-icons'
import { NavLink } from '@remix-run/react'
import Button from '../layout/button'

export type OptionProps = {
  postId: string
}
export default function PostOptions({ postId }: OptionProps) {
  return (
    <NavLink to={`/blog/${postId}/edit`}>
      <Button variant='unfilled' size='small'>
        <div className='flex flex-row space-x-1 text-blue-500'>
          <Pencil1Icon />
        </div>
      </Button>
    </NavLink>
  )
}
