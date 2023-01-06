import type { LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { BlogCard } from '~/components/shared/blog-ui/blog-card'
import { isAuthenticated } from '~/models/auth/auth.server'
import { getUserDrafts } from '~/models/post.server'
export async function loader({ request }: LoaderArgs) {
  const user = await isAuthenticated(request)
  if (!user) {
    return { redirect: '/auth/login' }
  }

  const drafts = await getUserDrafts(user.id)
  return json({ user, drafts })
}

export default function Drafts() {
  const data = useLoaderData<typeof loader>()

  return (
    <div className='mx-auto'>
      <h1>Drafts</h1>
      {data.drafts.map((draft) => (
        <BlogCard key={draft.id} posts={draft} />
      ))}
    </div>
  )
}
