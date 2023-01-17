import { LoaderArgs, json, SerializeFrom } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { badRequest } from 'remix-utils'
import { Card, Cards, PostCard } from '~/components/shared/blog-ui/card'
import { isAuthenticated } from '~/utils/server/auth/auth.server'
import { getPostById } from '~/utils/server/post.server'

export async function loader({ request, params }: LoaderArgs) {
  const postId = params?.postId
  if (!postId) return badRequest({ message: 'Invalid post' })

  const post = await getPostById(postId)

  return json({ post })
}

export default function Index() {
  const data = useLoaderData<{
    post: SerializeFrom<typeof getPostById>
  }>()

  const post = data.post

  return (
    <div className='col-start-2'>

    </div>
  )
}
