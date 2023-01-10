import type { LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import invariant from 'tiny-invariant'
import { Card } from '~/components/shared/blog-ui/card'
import { isAuthenticated } from '~/models/auth/auth.server'
import { getPostByCategoryValue } from '~/models/post.server'
import { Post } from '~/utils/schemas/post-schema'

export async function loader({ request, params }: LoaderArgs) {
  const user = await isAuthenticated(request)
  if (!user) {
    return { redirect: '/login' }
  }

  const categoryId = params.categoryId
  invariant(categoryId, 'categoryId is required')

  const posts = await getPostByCategoryValue(categoryId)
  const post = await posts.map((post) => {
    return {
      ...post,
      categories: post.categories
    }
  })

  return json({ posts })
}

export default function CategoryRoute() {
  const data = useLoaderData<typeof loader>()

  console.log(data, 'data')

  return <>{data && <Card posts={data.post} />}</>
}

function NoPosts() {
  return (
    <div>
      <h1>No Posts</h1>
    </div>
  )
}
