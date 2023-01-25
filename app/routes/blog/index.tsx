import type { SerializeFrom } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'
import { badRequest } from 'remix-utils'
import { PostCard } from '~/components/shared/blog-ui/post-card'
import getAllCategories from '~/utils/server/categories.server'
import { getPosts } from '~/utils/server/post.server'

export async function loader() {
  const posts = await getPosts()

  if (!posts) return badRequest({ message: 'There are no Posts' })
  // get all Categoiries for posts use this for useMatches, etc
  const categories = await getAllCategories()

  return json({ posts, categories })
}

export default function Index() {
  const data = useLoaderData<{
    posts: SerializeFrom<typeof getPosts>
    categories: SerializeFrom<typeof getAllCategories>
  }>()

  return (
    <div className='col-span-4 p-2 md:col-span-1 md:col-start-3 md:col-end-11'>
      {data.posts.map((post) => (
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

      <Outlet context={data.categories} />
    </div>
  )
}
