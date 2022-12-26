import { User } from '.prisma/client'
import type { LoaderArgs } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { NavLink, useLoaderData } from '@remix-run/react'
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
    <div
    className='flex flex-col items-center'

    >
      <h1
      className='mh1'
      >Users</h1>
<div
className=""
>

        { data.users.map((user) => (

          <UserCard
            key={ user.id }
            user={ user }
          />

        )) }
</div>

    </div>
  )
}

export type UserCardProps ={
  user: UserProps
}
function UserCard ({ user }: UserCardProps){


  return(
    <>
    <div
    key={user.id}
    className="flex flex-row border-2 items-center"
    >
      <div>
        <img src={ user.avatarUrl } alt={ user.userName } width="50" height="50" />
      </div>

     <NavLink
      className="flex flex-row items-center"
      to={`/users/${user.id}`}
      >

        {user.userName}
      </NavLink>
    </div>

    </>
  )

}