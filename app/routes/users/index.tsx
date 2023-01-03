import type { LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { NavLink, Outlet, useLoaderData, useMatches } from '@remix-run/react'
import UserCard from '~/components/shared/user-ui/user-card'
import { isAuthenticated } from '~/models/auth/auth.server'
import type { UserProps } from '~/models/user.server'
import { getUsers } from '~/models/user.server'
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
    <div className='flex flex-col items-center justify-center'>
      <h1 className='mh1'>Users</h1>

      {data.users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}

      <Outlet />
    </div>
  )
}
