import type { LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'
import UserCard from '~/components/shared/user-ui/user-card'
import { isAuthenticated } from '~/utils/server/auth/auth.server'
import type { UserProps } from '~/utils/server/user.server'
import { getUsers } from '~/utils/server/user.server'
import type { UserType } from '~/utils/schemas/user-schema'
import { Flex, Stack, Title } from '@mantine/core'
import { getProfiles, getUserProfile } from '~/utils/server/profile.server'
import { Profile } from '~/utils/schemas/profile-schema'

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

  const users = await getUsers()
  const profiles = await getProfiles()
  return json({ users, profiles })
}

export default function Users() {
  const data = useLoaderData<{
    users: UserType[]
    profiles: Profile[]
  }>()
  return (
      <>
      <Flex direction='column' gap={ 5 } align='center' className='w-full'>
      <Title order={ 1 }>Users</Title>
      { data.users.map((user: UserProps) => (
        <UserCard key={ user.id } user={ user } profiles={ data?.profiles } />
      )) }
    </Flex><Outlet /></>
  )
}
