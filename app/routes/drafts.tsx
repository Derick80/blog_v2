import type { LoaderArgs, SerializeFrom } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import invariant from 'tiny-invariant'
import { PostCard } from '~/components/shared/blog-ui/post-card'
import { isAuthenticated } from '~/utils/server/auth/auth.server'
import { getUserDrafts } from '~/utils/server/post.server'
import { Center } from '@mantine/core'

import type { MetaFunction } from '@remix-run/node' // or cloudflare/deno
import type { PostWithChildren } from '~/utils/schemas/post-schema'

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

  const post = await getUserDrafts(user.id)
  invariant(post, 'drafts are required')
  return json({ post })
}

export default function Drafts() {
  const data = useLoaderData<SerializeFrom<{ post: PostWithChildren[] }>>()

  return (
    <>
      <div className='flex grow flex-col items-center gap-5'>
        <h1>Drafts</h1>
        {data ? (
          data.post.map((draft: PostWithChildren) => (
            <PostCard
              key={draft.id}
              data={draft}
              showCategories={true}
              showComments={false}
              showOptions={true}
              showLikes={false}
              showFavorites={false}
              showShare={false}
            />
          ))
        ) : (
          <Center>
            <h2>You have no drafts</h2>
          </Center>
        )}
      </div>
    </>
  )
}
