import type { LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { getImageByFolder } from '~/models/cloudinary.server'
import { getPosts } from '~/models/post.server'

export async function loader({}: LoaderArgs) {
  const posts = await getPosts()

  return json({ posts })
}

export default function BlogRoute() {
  const data = useLoaderData()
  return (
    <>
      <h1>Blog</h1>
    </>
  )
}
