import type { LoaderArgs } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import invariant from 'tiny-invariant'
import { BlogCard } from '~/components/shared/blog-card'
import { isAuthenticated } from '~/models/auth/auth.server'
import { getPostsByCategoryNameId } from '~/models/categories.server'
import { prisma } from '~/models/prisma.server'
import { SerializedPost } from '~/utils/schemas/post-schema'

export async function loader({ request, params }: LoaderArgs) {
  const user = await isAuthenticated(request)
  if (!user) {
    return { redirect: '/auth/login' }
  }

  const categoryId = params.categoryId
  invariant(categoryId, 'categoryId is required')
  const category = await getPostsByCategoryNameId(categoryId)
  return json({ category })
}

export default function CategoryRoute() {
  const data = useLoaderData<typeof loader>()

  return (
    <>
      {data.category.map((post) => (
        <BlogCard key={post.id} posts={post} />
      ))}
    </>
  )
}
