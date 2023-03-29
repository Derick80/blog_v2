import type { MetaFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { NavLink, Outlet, useLoaderData } from '@remix-run/react'
import dayjs from 'dayjs'
import Avatar from '~/components/shared/avatar'
import { PostCard } from '~/components/shared/blog-ui/post-card'
import Divider from '~/components/shared/divider'
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
  const data = useLoaderData<typeof loader>()

  return (
    <div className='mx-auto flex flex-col items-center gap-2 p-2'>

      {data.post.map((post) => (
        <div
          key={post.id}
          className='items-cent flex flex-shrink w-full flex-row justify-between gap-2 bg-slate-700/10 shadow-2xl rounded-md overflow-hidden'
        >
          <div className='flex flex-col justify-between gap-2 p-1'>
            <NavLink to={`/blog/${post.id}`}>
              <h3 className='text-lg'>{post.title}</h3>
            </NavLink>

            <div className='flex flex-row items-center gap-2'>
              <p className='text-xs'>{dayjs(post.createdAt).format('MMM D')}</p>
            </div>
          </div>
          <div>
            <img
              src={post.imageUrl}
              alt={post.title}
              className='h-24 w-24 object-cover rounded-l-md'
            />
          </div>
        </div>
      ))}
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
