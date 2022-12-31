import type { LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'
import { BlogCard } from '~/components/shared/blog-card'
import { getPosts } from '~/models/post.server'
export async function loader({}: LoaderArgs) {
  const posts = await getPosts()

  return json({ posts })
}

export default function BlogRoute() {
  const data = useLoaderData()
  return (
    <>
      {data.posts.map((post) => (
        <BlogCard key={post.id} posts={post} />
      ))}

      <Outlet />
    </>
  )
}
