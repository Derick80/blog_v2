import type { LoaderArgs, MetaFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import invariant from 'tiny-invariant'
import { PostCard } from '~/components/shared/blog-ui/post-card'
import { isAuthenticated } from '~/utils/server/auth/auth.server'
import { getPostByCategoryValue } from '~/utils/server/post.server'
import type { Post } from '~/utils/schemas/post-schema'
export const meta: MetaFunction = () => {
  return {
    title: `Derick's Personal Blog | Blog Categories`,
    description: `List all articles by category`
  }
}
export async function loader({ request, params }: LoaderArgs) {
  console.log('params', params)

  const user = await isAuthenticated(request)

  const categoryId = params.categoriesId
  invariant(categoryId, 'categoryId is required')

  const posts = await getPostByCategoryValue(categoryId)
  if (!posts) {
    return new Response('No posts', { status: 404 })
  }
  return json({ posts, categoryId })
}

export default function CategoryRoute() {
  const data = useLoaderData<{ posts: Post[]; categoryId: string }>()

  return (
    <div className='flex grow flex-col items-center gap-5'>
      <h1 className='text-2xl font-bold'> {data.categoryId}</h1>
      {data ? (
        data.posts.map((post) => (
          <PostCard
            key={post.id}
            data={post}
            showCategories={true}
            showComments={false}
            showFavorites={true}
            showLikes={true}
            showOptions={true}
            showShare={true}
          />
        ))
      ) : (
        <NoPosts />
      )}
    </div>
  )
}

function NoPosts() {
  return (
    <div>
      <h1>No Posts</h1>
    </div>
  )
}
