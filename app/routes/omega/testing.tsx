import type { LoaderArgs } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { useLoaderData, Outlet } from '@remix-run/react'
import { isAuthenticated } from '~/utils/server/auth/auth.server'
export async function loader({ request }: LoaderArgs) {
  const user = await isAuthenticated(request)
  if (!user) {
    return { redirect: '/login' }
  }

  return json({ user })
}
export default function Index() {
  const data = useLoaderData()
  return (
    <

    >
      <div
        className='flex flex-col items-center justify-center w-full h-full'
        >
        {data.user.userName}
        </div>
    </>
  )
}
