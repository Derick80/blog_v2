import type { LoaderArgs, MetaFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import Dropdown from '~/components/shared/blog-ui/dropdown'
import { PostCard } from '~/components/shared/blog-ui/post-card'
import type { Favorite } from '~/utils/schemas/favorite.schema'
import { isAuthenticated } from '~/utils/server/auth/auth.server'
import { getFavoriteList } from '~/utils/server/favorite.server'

export const meta: MetaFunction = () => {
  return {
    title: `Derick's Personal Blog | Favorites`,
    description: `List all your favorite posts`
  }
}

export async function loader({ request, params }: LoaderArgs) {
  const user = await isAuthenticated(request)
  if (!user)
    return json({
      error: 'Not authenticated'
    })

  const favorites = await getFavoriteList(user.id)

  return json({ favorites })
}

export default function FavoritePosts() {
  const data = useLoaderData<{ favorites: Favorite[] }>()

  return (
    <div className='flex grow flex-col items-center gap-4 '>
      <h1 className='mb-5 text-3xl font-bold'>Favorite Posts</h1>
      <Dropdown />
      {data.favorites.map((favorite) => (
        <PostCard
          key={favorite.post.id}
          data={favorite.post}
          showLikes={true}
          showCategories={true}
          showComments={true}
          showFavorites={true}
          showOptions={true}
          showShare={true}
        />
      ))}
      <details className='w-1/2 text-xs text-gray-500 dark:text-gray-400'>
        <pre className='text-xs text-gray-500 dark:text-gray-400'>
          {JSON.stringify(data, null, 2)}
        </pre>
      </details>
    </div>
  )
}
