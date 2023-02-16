import { Stack } from '@mantine/core'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { badRequest } from 'remix-utils'
import Dropdown from '~/components/shared/blog-ui/dropdown'
import { PostCard } from '~/components/shared/blog-ui/post-card'
import type { Post } from '~/utils/schemas/post-schema'
import getAllCategories from '~/utils/server/categories.server'
import { getPosts } from '~/utils/server/post.server'

export type SimpleComments = {
  id: string
  parentId: string
  message: string
  createdAt: string
  user: {
    id: string
    username: string
    email: string
  }
}

export async function loader() {
  const posts = await getPosts()

  if (!posts) return badRequest({ message: 'There are no Posts' })

  // get all Categoiries for posts use this for useMatches, etc
  const categories = await getAllCategories()
  // get all comments for posts use this for useMatches, etc
  const comments = posts.map((post) => post.comments).flat()

  return json({ posts, categories, comments })
}

export default function Index() {
  const data = useLoaderData()
  return (
    <Stack align='center' className='mt-10 w-full'>
      <div className='flex justify-between w-full'>
        <h1 className='text-3xl font-bold'>Blog Feed</h1>
      <Dropdown />
      </div>
      {data.posts.map((post: Post) => (
        <PostCard
          key={post.id}
          data={post}
          user={post.user}
          showCategories={true}
          showLikes={true}
          showComments={true}
          showFavorites={true}
          showOptions={true}
          showShare={true}
        />
      ))}
      {/* <Outlet context={data.categories} /> */}
    </Stack>
  )
}
