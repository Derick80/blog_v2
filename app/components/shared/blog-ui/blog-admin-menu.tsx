import { Button } from '@mantine/core'
import { NavLink } from '@remix-run/react'
import { useOptionalUser } from '~/utils/utilities'

export default function BlogNav() {
  const user = useOptionalUser()
  return (
    <div className='mx-auto flex w-[350px] grow flex-col items-center gap-5 md:w-[650px] '>
      {user?.role === 'ADMIN' ? (
        <div className='flex gap-5'>
          <NavLink prefetch='intent' to='/blog/new'>
            <Button size='sm' variant='subtle'>
              New post
            </Button>
          </NavLink>
          <NavLink prefetch='intent' to='/drafts'>
            <Button size='sm' variant='subtle'>
              Drafts
            </Button>
          </NavLink>
          <NavLink prefetch='intent' to='/categories'>
            <Button size='sm' variant='subtle'>
              Manage categories
            </Button>
          </NavLink>
        </div>
      ) : null}
    </div>
  )
}
