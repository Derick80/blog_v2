import type { LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
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

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error)

  return (
    <div>
      <pre>{JSON.stringify(error, null, 2)}</pre>
    </div>
  )
}
