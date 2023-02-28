import { Button } from '@mantine/core'
import type { MetaFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { NavLink, Outlet, useLoaderData } from '@remix-run/react'
import { badRequest } from 'remix-utils'
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

export type SimpleComments = {
  id: string
  parentId: string
  message: string
  createdAt: string
  user: {
    id: string
    username: string
    email: string
  }
}

export async function loader() {
  const posts = await getPosts()

  if (!posts) return badRequest({ message: 'There are no Posts' })

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
      {user?.role === 'ADMIN' && (
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
          <NavLink prefetch='intent' to='/blog/categories'>
            <Button size='sm' variant='subtle'>
              Manage categories
            </Button>
          </NavLink>
        </div>
      )}
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
export function ErrorBoundary() {
  return (
    <div>
      <h1>BLOG ERROR</h1>
    </div>
  )
}
