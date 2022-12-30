import type { LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'
import { getPosts } from '~/models/post.server'
export async function loader({}: LoaderArgs) {
  const posts = await getPosts()

  return json({ posts })
}

export default function BlogRoute() {
  const data = useLoaderData()
  return (
    <>
      <Outlet />
    </>
  )
}
