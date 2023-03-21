import type { LoaderArgs, SerializeFrom } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { PostCard } from '~/components/shared/blog-ui/post-card'
import StatsCard from '~/components/shared/stats-card'
import type { Post } from '~/utils/schemas/post-schema'
import { getHeroPost } from '~/utils/server/post.server'

export async function loader({ request }: LoaderArgs) {
  const post = await getHeroPost()

  return json({ post })
}

export default function Index() {
  const data = useLoaderData<typeof loader>()
  return (
    <div className='flex h-screen grow flex-col items-center gap-4 '>
      <h2 className='text-2xl font-bold'>Latest Post</h2>
      <StatsCard />
      {data.post &&
        data.post.map((item) => (
          <PostCard
            key={item.id}
            data={item}
            user={item.user}
            showCategories={true}
            showComments={false}
            showFavorites={true}
            showLikes={true}
            showOptions={true}
            showShare={true}
          />
        ))}
    </div>
  )
}
