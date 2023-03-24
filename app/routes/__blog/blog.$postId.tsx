import { Flex } from '@mantine/core'
import type { LoaderArgs, SerializeFrom } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { badRequest } from 'remix-utils'
import { PostCard } from '~/components/shared/blog-ui/post-card'
import type { Post, PostWithChildren } from '~/utils/schemas/post-schema'
import getAllCategories from '~/utils/server/categories.server'
import { getPostById } from '~/utils/server/post.server'
import type { MetaFunction } from '@remix-run/node' // or cloudflare/deno
import { User } from '~/utils/schemas/user-schema'

export const meta: MetaFunction = () => {
  return {
    title: 'See a post',
    description:
      "See a post on Derick's blog and share your knowledge with the world"
  }
}
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
    <div className='flex flex-col items-center'>
      <div>Post ID page</div>
      {post && (
        <PostCard
          key={post.id}
          data={post}
          showCategories={true}
          showComments={true}
          showFavorites={true}
          showLikes={true}
          showShare={true}
          showOptions={true}
        />
      )}
    </div>
  )
}
