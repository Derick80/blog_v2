import type { LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useCatch, useLoaderData } from '@remix-run/react'
import { badRequest } from 'remix-utils'
import { PostCard } from '~/components/shared/blog-ui/post-card'
import getAllCategories from '~/utils/server/categories.server'
import { getPostById } from '~/utils/server/post.server'
import type { MetaFunction } from '@remix-run/node' // or cloudflare/deno
import type { PostWithChildren } from '~/utils/schemas/post-schema'

export const meta: MetaFunction = () => {
  return {
    title: 'See a post',
    description:
      "See a post on Derick's blog and share your knowledge with the world"
  }
}
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
    <div className='flex flex-col gap-4'>
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

export function CatchBoundary() {
  const caught = useCatch()

  switch (caught.status) {
    case 404: {
      return <h2>Error at blog postid</h2>
    }
    default: {
      // if we don't handle this then all bets are off. Just throw an error
      // and let the nearest ErrorBoundary handle this
      throw new Error(`${caught.status} not handled`)
    }
  }
}

// this will handle unexpected errors (like the default case above where the
// CatchBoundary gets a response it's not prepared to handle).
export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error)

  return (
    <div>
      <pre>{JSON.stringify(error, null, 2)}</pre>
    </div>
  )
}