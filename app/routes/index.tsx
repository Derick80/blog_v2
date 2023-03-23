import type { LoaderArgs, SerializeFrom } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import BlogNav from '~/components/shared/blog-ui/blog-admin-menu'
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
    <div className='flex grow flex-col items-center gap-4 '>
      <h1 className='text-3xl font-bold mb-5'>Latest Post</h1>
      <StatsCard />
      <BlogNav />
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
