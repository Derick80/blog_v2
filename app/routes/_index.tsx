import type { LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import {
  Link,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError
} from '@remix-run/react'
import { PostCard } from '~/components/shared/blog-ui/post-card'
import type { PostWithChildren } from '~/utils/schemas/post-schema'
import { getHeroPost } from '~/utils/server/post.server'
import { prisma } from '~/utils/server/prisma.server'

export async function loader({ request }: LoaderArgs) {
  const post = await getHeroPost()
const categories = await prisma.category.findMany({
  select: {
    id: true,
    value: true,
    label: true,
    _count: {
      select: {
        posts: true

      }
    }
  }
})

  return json({ post,categories })
}

export default function Index() {
  const data = useLoaderData<{ post: PostWithChildren[],
  categories: {
    id: string
    value: string
    label: string
    _count: { posts: number }
  }[]

  }>()

  const categories = data?.categories.filter((item: {
    _count: { posts: number }
  }) => item._count.posts > 0)

  return (
      <div className='flex w-full h-full flex-wrap gap-2 p-2'>
        {categories?.map((item: {
          id: string
          value: string
          label: string
          _count: { posts: number }
        }) => (
          <div
            className='flex flex-row items-center justify-between gap-2 rounded-xl border-2 p-1 '
            key={item.id}
          >
            <Link to={`/categories/${item.value}`}>{item.label}</Link>
            <p className=''>{item._count.posts}</p>
          </div>
        ))}
    

      {data.post &&
        data.post.map((item: PostWithChildren) => (
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
  )
}
export function ErrorBoundary() {
  const error = useRouteError()
  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>oops</h1>
        <h1>Status:{error.status}</h1>

        <p>{error.data.message}</p>
      </div>
    )
  }
  let errorMessage = 'unknown error'
  if (error instanceof Error) {
    errorMessage = error.message
  } else if (typeof error === 'string') {
    errorMessage = error
  }

  return (
    <div>
      <h1 className='text-2xl font-bold'>uh Oh..</h1>
      <p className='text-xl'>something went wrong</p>
      <pre>{errorMessage}</pre>
    </div>
  )
}
