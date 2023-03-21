import type { LoaderArgs, SerializeFrom } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import invariant from 'tiny-invariant'
import { PostCard } from '~/components/shared/blog-ui/post-card'
import { isAuthenticated } from '~/utils/server/auth/auth.server'
import { getUserDrafts } from '~/utils/server/post.server'
import { Center } from '@mantine/core'

import type { MetaFunction } from '@remix-run/node' // or cloudflare/deno
import BlogNav from '~/components/shared/blog-ui/blog-admin-menu'
import type { Post } from '~/utils/schemas/post-schema'
import type { User } from '@prisma/client'

export const meta: MetaFunction = () => {
  return {
    title: "Work on your drafts | Derick's Blog | Drafts",
    description: 'Work on your drafts and share your knowledge with the world'
  }
}
export async function loader({ request }: LoaderArgs) {
  const user = await isAuthenticated(request)
  if (!user) {
    return { redirect: '/login' }
  }

  const posts = await getUserDrafts(user.id)
  invariant(posts, 'drafts are required')
  return json({ user, posts })
}

export default function Drafts() {
  const data = useLoaderData<{
    user: SerializeFrom<User>
    posts: SerializeFrom<Post>[]
  }>()

  return (
    <>
      <div className='flex h-screen grow flex-col items-center gap-5'>
        <BlogNav />
        <h1 className='text-3xl font-bold'>Drafts</h1>
        {data.posts.length === 0 ? (
          <Center>
            <h1 className='text-2xl font-bold'>No drafts</h1>
          </Center>
        ) : (
          data.posts.map((post) => (
            <PostCard
              key={post.id}
              data={post}
              user={data.user}
              showCategories={true}
              showLikes={true}
              showComments={true}
              showFavorites={true}
              showOptions={true}
              showShare={true}
            />
          ))
        )}
      </div>
    </>
  )
}
