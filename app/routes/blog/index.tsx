import type { SerializeFrom } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'
import { badRequest } from 'remix-utils'
import { Card } from '~/components/shared/blog-ui/card'
import getAllCategories from '~/models/categories.server'
import { getPosts } from '~/models/post.server'

export async function loader() {
  const posts = await getPosts()

  if (!posts) return badRequest({ message: 'Invalid post' })
  const categories = await getAllCategories()

  return json({ posts, categories })
}

export default function BlogRoute() {
  const data = useLoaderData<{ posts: SerializeFrom<typeof getPosts> }>()

  return (
    <div className='grid-cols-repeat(minmax(300px, 1fr)) grid justify-items-center gap-4'>
      {data.posts.map((post) => {
        return (
          <Card
            key={post.id}
            post={post}
            user={post.user}
            showComments={true}
            showFavorites={true}
            showLikes={true}
            showShare={true}
            showOptions={true}
          />
        )
      })}

      <Outlet context={data.categories} />
    </div>
  )
}
