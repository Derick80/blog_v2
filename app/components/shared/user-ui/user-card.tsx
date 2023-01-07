import { NavLink } from '@remix-run/react'
import { UserProps } from '~/models/user.server'
import { UserPlaceHolder } from '../icons'

export type UserCardProps = {
  user?: UserProps
}
export default function UserCard({ user }: UserCardProps) {
  return (
    <>
      {user && (
        <div
          key={user.id}
          className='m-auto my-2 flex w-60 flex-col justify-between rounded-md border-2 p-1 md:p-2'
        >
          <div
            // main content
            className='border-b-red-300 flex flex-row border-b-2 pb-2'
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
              <div className='bg-gray-100 dark:bg-gray-600 relative h-10 w-10 overflow-hidden rounded-full'>
                <UserPlaceHolder />
              </div>
            )}
            <NavLink
              className='flex flex-col pl-1 md:pl-2 '
              to={`/users/${user.id}`}
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
        </div>
      )}
    </>
  )
}
