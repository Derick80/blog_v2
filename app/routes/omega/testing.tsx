import type { LoaderArgs } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { useLoaderData, Outlet } from '@remix-run/react'
import Dropdown from '~/components/shared/blog-ui/dropdown'
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
    <>
      <div className='col-span-4 p-2 md:col-span-1 md:col-start-3 md:col-end-11'>
        <div>
          <div className='flex h-full w-full flex-col items-center justify-center'>
            <h1 className='text-4xl font-bold'>Welcome to the blog</h1>
            <p className='text-xl'>This is the blog</p>
            <Dropdown />
          </div>
        </div>
      </div>
    </>
  )
}
