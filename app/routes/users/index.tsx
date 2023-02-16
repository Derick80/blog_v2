import type { LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Form, Outlet, useLoaderData } from '@remix-run/react'
import UserCard from '~/components/shared/user-ui/user-card'
import { isAuthenticated } from '~/utils/server/auth/auth.server'
import type { UserProps } from '~/utils/server/user.server'
import { getUsers } from '~/utils/server/user.server'
import type { UserType } from '~/utils/schemas/user-schema'
import { Button, Flex, Select, Title } from '@mantine/core'
import { getProfiles } from '~/utils/server/profile.server'
import { Profile } from '~/utils/schemas/profile-schema'
import { useOptionalUser } from '~/utils/utilities'
import { useState } from 'react'

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
  const profiles = await getProfiles()
  const userNames = users.map((user) => user.userName)

  return json({ users, profiles , currentUser, userNames})
}

export default function Users() {
  const data = useLoaderData<{
    users: UserType[]
    profiles: Profile[]
    currentUser: string
    userNames: string[]
  }>()
  const [searchValue, onSearchChange] = useState('');

  return (
      <>
      <Flex direction='column' gap={ 5 } align='center' className='w-full'>
      <Title order={ 1 }>Users</Title>
      <Form method='get' action={`users/${searchValue}`}>
      <Select
      label="Your favorite framework/library"
      placeholder="Pick one"
      searchable
      searchValue={searchValue}
      nothingFound="No options"
      data={
       data.userNames
      }
    />
    <Button type='submit'>Search</Button>
    </Form>
      { data.users.map((user: UserProps) => (<>

        <UserCard key={ user.id } user={ user } profiles={ data?.profiles } />
    </> ))}
    </Flex><Outlet /></>
  )
}
