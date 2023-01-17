import { Center, Stack } from '@mantine/core'
import type { SerializeFrom } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'
import { badRequest } from 'remix-utils'
import { PostCard } from '~/components/shared/blog-ui/card'
import getAllCategories from '~/utils/server/categories.server'
import { getPosts } from '~/utils/server/post.server'

export async function loader() {
  const posts = await getPosts()

  if (!posts) return badRequest({ message: 'There are no Posts' })
  // get all Categoiries for posts use this for useMatches, etc
  const categories = await getAllCategories()

  return json({ posts, categories })
}

export default function BlogRoute() {
  const data = useLoaderData<{
    posts: SerializeFrom<typeof getPosts>
    categories: SerializeFrom<typeof getAllCategories>
  }>()

  return (
    <Center>
    <Stack>
      {data.posts.map((post) => (
        <PostCard key={post.id} data={post}
          showComments={true}
          showLikes={true}
          showFavorites={true}
          showShare={true}
          showOptions={true}
          user={post.user}

        />
      ))}
    </Stack>
    </Center>
  )
}
