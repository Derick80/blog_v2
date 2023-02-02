import { Flex, Stack } from '@mantine/core'
import type { LoaderArgs, SerializeFrom } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Outlet, useFetcher, useLoaderData } from '@remix-run/react'
import { useEffect } from 'react'
import { badRequest } from 'remix-utils'
import { PostCard } from '~/components/shared/blog-ui/post-card'
import getAllCategories from '~/utils/server/categories.server'
import { getPostById } from '~/utils/server/post.server'

export async function loader({ request, params }: LoaderArgs) {
  const postId = params?.postId
  if (!postId) return badRequest({ message: 'Invalid post' })

  const post = await getPostById(postId)
  const categories = await getAllCategories()
  return json({ post, categories })
}

export default function Index() {
  const data = useLoaderData<{
    post: SerializeFrom<typeof getPostById>
    categories: SerializeFrom<typeof getAllCategories>
  }>()

  const post = data.post

  return (
    <Flex justify='center' align='center' direction='column'>
      {post && (
        <PostCard
          key={post.id}
          data={post}
          user={post.user}
          showCategories={true}
          showComments={true}
          showFavorites={true}
          showLikes={true}
          showShare={true}
          showOptions={true}
        />
      )}
    </Flex>
  )
}
