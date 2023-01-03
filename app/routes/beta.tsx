import type { LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { Card } from '~/components/shared/blog-ui/card'
import { getCommentsAndUserData } from '~/models/comments.server'
export async function loader({ request }: LoaderArgs) {
  const results = await getCommentsAndUserData()
  return json({ results })
}

export default function BlogIndex() {
  const data = useLoaderData<typeof loader>()
  return <div className='mx-auto flex w-fit flex-col gap-5'></div>
}
