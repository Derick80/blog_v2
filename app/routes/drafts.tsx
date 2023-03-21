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

  const drafts = await getUserDrafts(user.id)
  invariant(drafts, 'drafts are required')
  return json({ user, drafts })
}

export default function Drafts() {
  const data = useLoaderData<{
    user: SerializeFrom<typeof isAuthenticated>
    drafts: SerializeFrom<typeof getUserDrafts>
  }>()

  return (
    <>
      <div className='flex grow h-screen flex-col items-center gap-5'>
        <BlogNav />
        <h1
          className='text-3xl font-bold'
        >Drafts</h1>
        {data.drafts.length > 0 ? (
          data.drafts.map((draft) => (
            <PostCard
              key={draft.id}
              data={draft}
              showCategories={true}
              showComments={false}
              showOptions={true}
              showLikes={false}
              showFavorites={false}
              showShare={false}
              user={data.user}
            />

          ))
        ) : (
          <div
            className='flex flex-col items-center gap-5'
          >
            <h2 className='text-2xl italic'>You have no drafts</h2>

          </div>
        )}
      </div>
    </>
  )
}
