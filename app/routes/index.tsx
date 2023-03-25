import type { LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import React from 'react'
import { PostCard } from '~/components/shared/blog-ui/post-card'
import { getHeroPost } from '~/utils/server/post.server'

export async function loader({ request }: LoaderArgs) {
  const post = await getHeroPost()

  return json({ post })
}

export default function Index() {
  const [open, setOpen] = React.useState(false)
  const data = useLoaderData<typeof loader>()
  return (
    <div className='flex grow flex-col items-center gap-4 '>
      <h1 className='mb-5 text-sm font-bold'>Latest Post</h1>

      <div className='flex flex-col items-center gap-4'>
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
      </div>
    </div>
  )
}
