import type { LoaderArgs } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import invariant from 'tiny-invariant'
import { BlogCard } from '~/components/shared/blog-ui/blog-card'
import { isAuthenticated } from '~/models/auth/auth.server'
import { getPostByCategoryValue } from '~/models/post.server'
import { prisma } from '~/models/prisma.server'
import { SerializedPost } from '~/utils/schemas/post-schema'

export async function loader({ request, params }: LoaderArgs) {
  const user = await isAuthenticated(request)
  if (!user) {
    return { redirect: '/login' }
  }

  const categoryId = params.categoryId
  invariant(categoryId, 'categoryId is required')
  console.log(categoryId, 'categoryId');

  const posts = await getPostByCategoryValue('JavaScript')

  return json({ posts })
}

export default function CategoryRoute() {
  const data = useLoaderData<typeof loader>()
console.log(data, 'data');

  return (
    <>
{ data.posts && <BlogCard
        posts={data.posts   } /> }

    </>
  )
}



function NoPosts(){
  return (
    <div>
      <h1>No Posts</h1>
    </div>
  )
}