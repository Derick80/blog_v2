import type { LoaderArgs, MetaFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'
import UserCard from '~/components/shared/user-ui/user-card'
import { isAuthenticated } from '~/utils/server/auth/auth.server'
import type { UserProps } from '~/utils/server/user.server'
import { getUsers } from '~/utils/server/user.server'
import type { UserType } from '~/utils/schemas/user-schema'
import type { Profile } from '~/utils/schemas/profile-schema'
export const meta: MetaFunction = () => {
  return {
    title: `Derick's Personal Blog | Users`,
    description: `Registered users may search for other registered users`
  }
}
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
  const currentUser = user?.id

  const users = await getUsers()
  const userNames = users.map((user) => user.userName)

  return json({ users, currentUser, userNames })
}

export default function Users() {
  const data = useLoaderData<{
    users: UserType[]
    profiles: Profile[]
    currentUser: string
    userNames: string[]
  }>()

  return (
    <div className='flex w-full flex-col items-center gap-5 '>
      <div className='text-2xl font-semibold'>Users</div>

      {data.users.map((user: UserProps) => (
        <>
          <UserCard key={user.id} user={user} />
        </>
      ))}
      <Outlet />
    </div>
  )
}
