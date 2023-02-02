import { Stack } from '@mantine/core'
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
  const data = useLoaderData<{ post: SerializeFrom<Post> }>()
  return (
    <Stack align='center' className='w-full'>
      <StatsCard />
      <div>Hero Post</div>
      {data.post && (
        <PostCard
          key={data.post.id}
          data={data.post}
          user={data.post.user}
          showCategories={true}
          showComments={false}
          showFavorites={true}
          showLikes={true}
          showOptions={true}
          showShare={true}
        />
      )}
    </Stack>
  )
}
