import { Stack } from '@mantine/core'
import type { LoaderArgs, SerializeFrom } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'
import { badRequest } from 'remix-utils'
import { PostCard } from '~/components/shared/blog-ui/post-card'
import { getPostById } from '~/utils/server/post.server'

export async function loader({ request, params }: LoaderArgs) {
  const postId = params?.postId
  if (!postId) return badRequest({ message: 'Invalid post' })

  const post = await getPostById(postId)

  return json({ post })
}

export default function Index() {
  const data = useLoaderData<{
    post: SerializeFrom<typeof getPostById>
  }>()

  const post = data.post

  return (
    <div className='col-span-4 flex p-2 md:col-span-1 md:col-start-3 md:col-end-11'>
          <Stack align="center" >

      <div className='flex flex-row items-center justify-center'>
        <h1 className='text-2xl'>Post</h1>
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
        <Outlet />
      </div>
      </Stack>
    </div>
  )
}
