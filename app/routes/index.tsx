import { json, LoaderArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { getMyPosts } from '~/models/post.server'
import { getMyPostsByEmail } from '~/models/user.server'

export async function loader({ request }: LoaderArgs) {
  const posts = await getMyPostsByEmail('iderick@gmail.com')
  const blogPostCount = posts.length

  return json({ posts, blogPostCount })
}

export default function Index() {
  const data = useLoaderData<typeof loader>()
  return (
    <>
      <div>
        My stats number of posts {data.blogPostCount}, number of comments,
        number of likes, trips taken, trips planned, projects completed,
        projects in progress, etc.
      </div>
    </>
  )
}
