import type { ActionArgs, SerializeFrom } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'
import { badRequest } from 'remix-utils'
import { Card } from '~/components/shared/blog-ui/card'
import { isAuthenticated } from '~/models/auth/auth.server'
import { flashAndCommit } from '~/models/auth/session.server'
import { createComment } from '~/models/comments.server'
import { getPosts } from '~/models/post.server'
import { validateText } from '../validators.server'

export async function loader() {
  const posts = await getPosts()

  if (!posts) return badRequest({ message: 'Invalid post' })

  return json({ posts })
}

export default function BlogRoute() {
  const data = useLoaderData<{ posts: SerializeFrom<typeof getPosts> }>()

  return (
    <div className='grid-cols-repeat(minmax(300px, 1fr)) grid justify-items-center gap-4'>
      {data.posts.map((post) => {
        return (
          <Card
            key={post.id}
            post={post}
            user={post.user}
            showComments={true}
            showFavorites={true}
            showLikes={true}
            showShare={true}
            showOptions={true}
          />
        )
      })}

      <Outlet />
    </div>
  )
}
