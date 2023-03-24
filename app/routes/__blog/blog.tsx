import { Button, Divider } from '@mantine/core'
import type { MetaFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { NavLink, Outlet, useLoaderData } from '@remix-run/react'
import { badRequest } from 'remix-utils'
import { ManyPostProps, PostCard } from '~/components/shared/blog-ui/post-card'
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
    <div className='mx-auto flex w-[350px] grow flex-col items-center gap-5 md:w-[550px] '>
      {user?.role === 'ADMIN' ? (
        <div className='flex gap-5'>
          <NavLink prefetch='intent' to='/blog/new'>
            <Button size='sm' variant='subtle'>
              New post
            </Button>
          </NavLink>
          <NavLink prefetch='intent' to='/drafts'>
            <Button size='sm' variant='subtle'>
              Drafts
            </Button>
          </NavLink>
          <NavLink prefetch='intent' to='/categories'>
            <Button size='sm' variant='subtle'>
              Manage categories
            </Button>
          </NavLink>
        </div>
      ) : null}
      <Divider
        className='w-full'
        style={{ height: '1px', backgroundColor: '#e2e8f0' }}
      />
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
