import type { LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { PostCard } from '~/components/shared/blog-ui/post-card'
import type { PostWithChildren } from '~/utils/schemas/post-schema'
import type { User } from '~/utils/schemas/user-schema'
import { getHeroPost } from '~/utils/server/post.server'
import { useMatchesData } from '~/utils/utilities'

export async function loader({ request }: LoaderArgs) {
  const post = await getHeroPost()

  return json({ post })
}

export default function Index() {
  const data = useLoaderData<{ post: PostWithChildren[] }>()
  const tags = useMatchesData('root') as {
    categories: {
      id: string
      label: string
      value: string
      _count: {
        posts: number
      }
    }[]
    user: User
  }
  const categories = tags.categories.filter((item) => item._count.posts > 0)

  console.log(categories, 'tags')
  console.log(Array.isArray(categories), 'isArray')

  return (
    <div className='flex flex-col items-center gap-4'>
      <div className='flex w-full flex-wrap gap-2 p-2'>
        {categories.map((item) => (
          <div
            className='flex flex-row items-center justify-between gap-2 rounded-xl border-2 p-1 '
            key={item.id}
          >
            <Link to={`/categories/${item.value}`}>{item.label}</Link>
            <p className=''>{item._count.posts}</p>
          </div>
        ))}
      </div>

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
