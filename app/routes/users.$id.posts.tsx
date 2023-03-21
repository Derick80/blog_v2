import type { LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { PostCard } from '~/components/shared/blog-ui/post-card'
import { isAuthenticated } from '~/utils/server/auth/auth.server'
import {
  getPosts,
  getPublishedUserPostsByUserId,
  getUserPosts
} from '~/utils/server/post.server'
import type { Post } from '~/utils/schemas/post-schema'
import type { User } from '@prisma/client'
export async function loader({ request, params }: LoaderArgs) {
  const { id } = params

  if (!id) {
    throw new Error('id is required')
  }
  const user = await isAuthenticated(request)
  const posts = await getPublishedUserPostsByUserId(id)

  return json({ posts, user })
}

export default function UserPosts() {
  const data = useLoaderData<{
    posts: Post[]
    user: User
  }>()

  return (
    <div>
      <h1>Posts</h1>

      {data.posts.map((post) => (
        <PostCard
          key={post.id}
          data={post}
          showCategories={true}
          showComments={true}
          showOptions={true}
          showLikes={true}
          showFavorites={true}
          showShare={true}
          user={data.user}
        />
      ))}
    </div>
  )
}
