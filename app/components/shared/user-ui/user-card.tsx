import { PaperPlaneIcon, TrashIcon } from '@radix-ui/react-icons'
import { Form, NavLink } from '@remix-run/react'
import type { Profile } from '~/utils/schemas/profile-schema'
import type { UserProps } from '~/utils/server/user.server'
import { useOptionalUser } from '~/utils/utilities'
import { UserPlaceHolder } from '../icons'

export type UserCardProps = {
  user: UserProps
  profiles?: Profile[]
}
export default function UserCard({ user, profiles }: UserCardProps) {
  const optionalUser = useOptionalUser()
  const currentUser = optionalUser?.id
  return (
    <>
      {user && (
        <>
          <div
            key={user.id}
            className=' my-2 flex w-[350px] flex-col justify-between rounded-md border-2 p-1 md:w-[650px] md:p-2'
          >
            <div
              // main content
              className='flex flex-row border-b-2 border-b-red-300 pb-2'
            >
              {user?.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={user.userName}
                  width='50'
                  height='50'
                  className='h-10 w-10 rounded-full'
                />
              ) : (
                <div className='relative h-10 w-10 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-600'>
                  <UserPlaceHolder />
                </div>
              )}
              <NavLink
                className='flex flex-col pl-1 md:pl-2 '
                to={`/users/${user.userName}`}
              >
                <p className='text-xs italic'>Username</p>
                <p className='text-base'> {user.userName}</p>
              </NavLink>
            </div>

            <p className='pt-1 text-xs font-bold md:pt-2'>User statistics</p>
            <div
              // sub content
              className='flex flex-row items-center justify-between'
            >
              <NavLink
                className='flex flex-row items-center'
                to={`/users/${user.id}/posts`}
              >
                <p className='text-sm italic'>User posts:</p>
                <p className='text-sm'>{user._count.posts}</p>
              </NavLink>
              <NavLink
                className='flex flex-row items-center'
                to={`/users/${user.id}/posts`}
              >
                <p className='text-sm italic'>total likes:</p>
                <p className='text-sm'>{user._count.likes}</p>
              </NavLink>
            </div>
            {currentUser === user.id && (
              <>
                <Form action={`/users/${user.id}/edit`}>
                  <button
                    type='submit'
                    className='flex flex-row items-center justify-center gap-1 rounded-md bg-gray-100 p-1 dark:bg-gray-600'
                  >
                    <p>Edit</p>
                    <PaperPlaneIcon />
                  </button>
                </Form>
                <Form
                  method='post'
                  action='destroy'
                  onSubmit={(event) => {
                    if (
                      !confirm('Please confirm you want to delete this record.')
                    ) {
                      event.preventDefault()
                    }
                  }}
                >
                  <button type='submit'>
                    <TrashIcon />
                  </button>
                </Form>
              </>
            )}
          </div>
        </>
      )}
    </>
  )
}
