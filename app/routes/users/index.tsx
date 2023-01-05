import type { LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { NavLink, Outlet, useLoaderData, useMatches } from '@remix-run/react'
import UserCard from '~/components/shared/user-ui/user-card'
import { isAuthenticated } from '~/models/auth/auth.server'
import type { UserProps } from '~/models/user.server'
import { getUsers } from '~/models/user.server'
import { User } from '~/utils/schemas/user-schema'

export type TestUser = {
  [key: string]: {
    id: string
    email: string
    userName: string
    avatarUrl: string
    role: string
    _count: {
      accounts: number
      tokens: number
      posts: number
      likes: number
      projects: number
    }
  }
}
export async function loader({ request }: LoaderArgs) {
  const user = await isAuthenticated(request)
  if (!user) {
    return { redirect: '/login' }
  }

  // const users =
  return json({ users: await getUsers() })
}

export default function Users() {
  const data = useLoaderData<typeof loader>()
  const users = data.users as ReturnType<typeof getUsers>
  return (
    <div className='flex flex-col items-center justify-center'>
      <h1 className='mh1'>Users</h1>

      {data.users.map((user: UserProps) => (
        <UserCard key={user.id} user={user} />
      ))}

      <Outlet />
    </div>
  )
}
