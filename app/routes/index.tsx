import type { LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import React from 'react'
import { PostCard } from '~/components/shared/blog-ui/post-card'
import type { PostWithChildren } from '~/utils/schemas/post-schema'
import { getHeroPost } from '~/utils/server/post.server'

export async function loader({ request }: LoaderArgs) {
  const post = await getHeroPost()

  return json({ post })
}

export default function Index() {
  const data = useLoaderData<{ post: PostWithChildren[] }>()
  return (

      <div className='flex flex-col items-center gap-4'>
        {data.post &&
          data.post.map((item: PostWithChildren) => (
            <PostCard
              key={item.id}
              data={item}
              showCategories={true}
              showComments={true}
              showFavorites={true}
              showLikes={true}
              showOptions={true}
              showShare={true}
            />
          ))}
    </div>
  )
}
