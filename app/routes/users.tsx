import { User } from '.prisma/client'
import type { LoaderArgs } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { NavLink, Outlet, useLoaderData, useMatches } from '@remix-run/react'
import { isAuthenticated } from '~/models/auth/auth.server'
import { getUsers, UserProps } from '~/models/user.server'
export async function loader({ request }: LoaderArgs) {
  const user = await isAuthenticated(request)
  if (!user) {
    return { redirect: '/auth/login' }
  }

  const users = await getUsers()
  return json({ users })
}

export default function Users() {
  const data = useLoaderData()
  return (
    <>
      <h1 className='mh1'>Users</h1>

      {data.users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}

      <Outlet />
    </>
  )
}

export type UserCardProps = {
  user: UserProps
}
function UserCard({ user }: UserCardProps) {
  const matches = useMatches()

  return (
    <div
      key={user.id}
      className='m-auto my-2 flex w-60 flex-col justify-between rounded-md border-2'
    >
      <div
        // main content
        className='flex flex-row border-b-2 border-b-red-300'
      >
        <img
          src={user.avatarUrl}
          alt={user.userName}
          width='50'
          height='50'
          className='rounded-full'
        />
        <NavLink className='flex flex-col' to={`/users/${user.id}`}>
          <p className='text-xs italic'>Username</p>
          <p className='text-base'> {user.userName}</p>
        </NavLink>
      </div>

      <p className='text-xs font-bold'>User statistics</p>
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
  )
}
