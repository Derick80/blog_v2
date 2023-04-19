import type { LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import {
  isRouteErrorResponse,
  useLoaderData,
  useRouteError
} from '@remix-run/react'
import { badRequest } from 'remix-utils'
import { PostCard } from '~/components/shared/blog-ui/post-card'
import getAllCategories from '~/utils/server/categories.server'
import { getPostById } from '~/utils/server/post.server'
// or cloudflare/deno
import type { PostWithChildren } from '~/utils/schemas/post-schema'

export async function loader({ params }: LoaderArgs) {
  const postId = params?.postId
  if (!postId) return badRequest({ message: 'Invalid post' })

  const post = await getPostById(postId)
  if (!post) return badRequest({ message: 'Invalid post' })
  const categories = await getAllCategories()
  return json({ post, categories })
}

export default function Index() {
  const { post } = useLoaderData<{ post: PostWithChildren }>()

  return (
    <div className='flex w-full flex-col gap-4'>
      <PostCard
        data={post}
        showLikes={true}
        showFavorites={true}
        showComments={true}
        showShare={true}
        showOptions={true}
        showCategories={true}
      />
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
