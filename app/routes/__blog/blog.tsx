import { Button, Divider } from '@mantine/core'
import type { MetaFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { NavLink, Outlet, useLoaderData } from '@remix-run/react'
import { badRequest } from 'remix-utils'
import BlogNav from '~/components/shared/blog-ui/blog-admin-menu'
import { PostCard } from '~/components/shared/blog-ui/post-card'
import type { Post } from '~/utils/schemas/post-schema'
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
  const posts = await getPosts()

  if (!posts) throw new Error('Error')

  // get all Categoiries for posts use this for useMatches, etc
  const categories = await getAllCategories()
  // get all comments for posts use this for useMatches, etc
  const comments = posts.map((post) => post.comments).flat()

  return json({ posts, categories, comments })
}

export default function Index() {
  const user = useOptionalUser()
  const data = useLoaderData()
  return (
    <div className='mx-auto flex w-[350px] grow flex-col items-center gap-5 md:w-[650px] '>
      <h1 className='text-3xl font-bold'>Blog Feed</h1>
      {user?.role === 'ADMIN' ? (
       <BlogNav />
      ) : null}
      <Divider
        className='w-full'
        style={{ height: '1px', backgroundColor: '#e2e8f0' }}
      />
      {data.posts.map((post: Post) => (
        <PostCard
          key={post.id}
          data={post}
          user={post.user}
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
