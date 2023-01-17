import type { LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { NavLink, Outlet, useLoaderData, useMatches } from '@remix-run/react'
import UserCard from '~/components/shared/user-ui/user-card'
import { isAuthenticated } from '~/utils/server/auth/auth.server'
import type { UserProps } from '~/utils/server/user.server'
import { getUsers } from '~/utils/server/user.server'
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
    <div className='mx-auto  mb-2 mt-2 flex h-fit flex-col rounded-2xl p-2 md:mb-5 md:mt-5'>
      <h1 className='mh1 mx-auto'>Users</h1>

      <div className='flex h-fit flex-wrap'>
        {data.users.map((user: UserProps) => (
          <UserCard key={user.id} user={user} />
        ))}

        <Outlet />
      </div>
    </div>
  )
}
