import type { LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import BlogNav from '~/components/shared/blog-ui/blog-admin-menu'
import { PostCard } from '~/components/shared/blog-ui/post-card'
import StatsCard from '~/components/shared/stats-card'
import { getHeroPost } from '~/utils/server/post.server'

export async function loader({ request }: LoaderArgs) {
  const post = await getHeroPost()

  return json({ post })
}

export default function Index() {
  const data = useLoaderData<typeof loader>()
  return (
    <div className='flex grow flex-col items-center gap-4 '>
      <h1 className='mb-5 text-3xl font-bold'>Latest Post</h1>
      <StatsCard />
      <BlogNav />
      {data.post &&
        data.post.map((item) => (
          <PostCard
            key={item.id}
            data={item}
            showCategories={true}
            showComments={false}
            showFavorites={true}
            showLikes={true}
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
