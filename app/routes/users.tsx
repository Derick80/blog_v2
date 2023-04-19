import type { LoaderArgs, MetaFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import {
  Outlet,
  isRouteErrorResponse,
  useFetcher,
  useLoaderData,
  useRouteError
} from '@remix-run/react'
import UserCard from '~/components/shared/user-ui/user-card'
import { isAuthenticated } from '~/utils/server/auth/auth.server'
import type { UserProps } from '~/utils/server/user.server'
import { getUsers } from '~/utils/server/user.server'
import type { UserType } from '~/utils/schemas/user-schema'
import { Select } from '@mantine/core'
import { getProfiles } from '~/utils/server/profile.server'
import type { Profile } from '~/utils/schemas/profile-schema'
import { useState } from 'react'

export function meta() {
  return [
    { title: 'Blog' },
    { name: 'description', content: 'User Index Page' },
    { property: 'og:title', content: 'User' },
    { property: 'og:description', content: 'User index page' }
  ]
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
    currentUser: string
    userNames: string[]
  }>()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchValue, onSearchChange] = useState('')
  const userFetcher = useFetcher()
  return (
    <div className='flex w-full flex-col items-center gap-5 '>
      <div className='text-2xl font-semibold'>Users</div>
      <userFetcher.Form method='get' action={`users/${searchValue}`}>
        <Select
          label='Search by username'
          placeholder='Pick one'
          searchable
          searchValue={searchValue}
          nothingFound='No options'
          data={data.userNames}
        />
        <button className='' type='submit'>
          Search
        </button>
      </userFetcher.Form>
      {data.users.map((user: UserProps) => (
        <>
          <UserCard key={user.id} user={user} />
        </>
      ))}
      <Outlet />
    </div>
  )
}
export function ErrorBoundary() {
  const error = useRouteError()
  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>oops</h1>
        <h1>Status:{error.status}</h1>
        <p>{error.data.message}</p>
      </div>
    )
  }
  let errorMessage = 'unknown error'
  if (error instanceof Error) {
    errorMessage = error.message
  } else if (typeof error === 'string') {
    errorMessage = error
  }

  return (
    <div>
      <h1 className='text-2xl font-bold'>uh Oh..</h1>
      <p className='text-xl'>something went wrong</p>
      <pre>{errorMessage}</pre>
    </div>
  )
}
