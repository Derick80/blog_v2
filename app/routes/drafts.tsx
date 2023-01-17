import type { LoaderArgs, SerializeFrom } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import invariant from 'tiny-invariant'
import { isAuthenticated } from '~/utils/server/auth/auth.server'
import { getUserDrafts } from '~/utils/server/post.server'
import type { SerializedEditPost } from '~/utils/schemas/post-schema'
import { PostCard } from '~/components/shared/blog-ui/card'
export async function loader({ request }: LoaderArgs) {
  const user = await isAuthenticated(request)
  if (!user) {
    return { redirect: '/auth/login' }
  }

  const drafts = await getUserDrafts(user.id)
  invariant(drafts, 'drafts are required')
  return json({ user, drafts })
}

export default function Drafts() {
  const { drafts, user } = useLoaderData<{
    user: SerializeFrom<typeof isAuthenticated>
    drafts: SerializedEditPost[]
  }>()
  return (
    <>
      <div className='mx-auto'>
        <h1>Drafts</h1>
        {drafts.map((draft: SerializedEditPost) => (
          <PostCard
            key={draft.id}
            post={draft}
            showComments={false}
            showShare={false}
            showOptions={true}
            showFavorites={false}
            showLikes={false}
            user={user}
          />
        ))}
      </div>
    </>
  )
}
