import { Text, Stack } from '@mantine/core'
import { json } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'
import { useMemo } from 'react'
import { badRequest } from 'remix-utils'
import { PostCard } from '~/components/shared/blog-ui/post-card'
import getAllCategories from '~/utils/server/categories.server'
import { getPosts } from '~/utils/server/post.server'
import { prisma } from '~/utils/server/prisma.server'

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
  const comments = posts.map((post) => post.comments)




  return json({ posts, categories,comments })
}

export default function Index() {
const data = useLoaderData()



  return (
    <Stack align='center'>
      <Text>Post</Text>

      {data.posts.map((post) => (
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
