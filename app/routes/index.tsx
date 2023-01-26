import type { LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { getMyPostsByEmail } from '~/utils/server/user.server'
import { useOptionalUser } from '~/utils/utilities'

export async function loader({ request }: LoaderArgs) {
  const posts = await getMyPostsByEmail('iderick@gmail.com')
  const blogPostCount = posts.length

  return json({ posts, blogPostCount })
}

export default function Index() {
  const user = useOptionalUser()

  const data = useLoaderData<typeof loader>()
  return (
    <>
      <div className='col-span-1 col-start-1  md:col-span-6 md:col-start-4'>
        <h1>Posts </h1>
        {user && <div>elcome {user.userName}</div>}
        <div>Hero Post</div>
        <div>About me post</div>
        My stats number of posts {data.blogPostCount}, number of comments,
        number of likes, trips taken, trips planned, projects completed,
        projects in progress, etc. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Corporis ullam, exercitationem necessitatibus animi
        debitis est perspiciatis unde, voluptate eligendi rerum vel et ad cumque
        commodi quo recusandae consequuntur consequatur veritatis. My stats
        number of posts {data.blogPostCount}, number of comments, number of
        likes, trips taken, trips planned, projects completed, projects in
        progress, etc. Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Corporis ullam, exercitationem necessitatibus animi debitis est
        perspiciatis unde, voluptate eligendi rerum vel et ad cumque commodi quo
        recusandae consequuntur consequatur veritatis. My stats number of posts{' '}
        {data.blogPostCount}, number of comments, number of likes, trips taken,
        trips planned, projects completed, projects in progress, etc. Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Corporis ullam,
        exercitationem necessitatibus animi debitis est perspiciatis unde,
        voluptate eligendi rerum vel et ad cumque commodi quo recusandae
        consequuntur consequatur veritatis. My stats number of posts{' '}
        {data.blogPostCount}, number of comments, number of likes, trips taken,
        trips planned, projects completed, projects in progress, etc. Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Corporis ullam,
        exercitationem necessitatibus animi debitis est perspiciatis unde,
        voluptate eligendi rerum vel et ad cumque commodi quo recusandae
        consequuntur consequatur veritatis. My stats number of posts{' '}
        {data.blogPostCount}, number of comments, number of likes, trips taken,
        trips planned, projects completed, projects in progress, etc. Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Corporis ullam,
        exercitationem necessitatibus animi debitis est perspiciatis unde,
        voluptate eligendi rerum vel et ad cumque commodi quo recusandae
        consequuntur consequatur veritatis.
      </div>
    </>
  )
}
