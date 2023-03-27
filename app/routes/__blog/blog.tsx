import type { MetaFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'
import { PostCard } from '~/components/shared/blog-ui/post-card'
import getAllCategories from '~/utils/server/categories.server'
import { getPosts } from '~/utils/server/post.server'
import { useOptionalUser } from '~/utils/utilities'

export const meta: MetaFunction = () => {
  return {
    title: `Derick's Personal Blog | Dashboard`,
    description: `A feed of science and technology articles, genetics, and bioinformatics`
  }
}

export async function loader() {
  const post = await getPosts()

  if (!post) throw new Error('Error')

  // get all Categoiries for posts use this for useMatches, etc
  const categories = await getAllCategories()
  // get all comments for posts use this for useMatches, etc
  const comments = post.map((post) => post.comments).flat()

  return json({ post, categories, comments })
}

export default function Index() {
  const user = useOptionalUser()
  const data = useLoaderData<typeof loader>()

  return (
    <div className='mx-auto flex grow flex-col items-center gap-2 '>
      {data.post.map((post) => (
        <PostCard
          key={post.id}
          data={post}
          showCategories={true}
          showLikes={true}
          showComments={true}
          showFavorites={true}
          showOptions={true}
          showShare={true}
        />
      ))}
      <Outlet />
    </div>
  )
}
export function ErrorBoundary({ error }: any) {
  return (
    <div>
      <h1 className='text-3xl font-bold'>Blog ERROR</h1>
      <p>{error.message}</p>
      <p>The stack trace is:</p>
      <pre>{error.stack}</pre>
    </div>
  )
}
