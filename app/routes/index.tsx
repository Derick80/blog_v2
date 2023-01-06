import type { LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { getMyPostsByEmail } from '~/models/user.server'
import { useOptionalUser } from '~/utils/utils'

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
      <div className='mx-auto flex flex-col gap-5 p-2 md:w-1/2 md:flex-row'>
        <div className='mx-auto flex grow flex-col rounded-lg bg-zinc-200 dark:bg-zinc-400'>
          <div>Hero Post</div>
          <div>About me post</div>
          My stats number of posts {data.blogPostCount}, number of comments,
          number of likes, trips taken, trips planned, projects completed,
          projects in progress, etc. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Corporis ullam, exercitationem necessitatibus animi
          debitis est perspiciatis unde, voluptate eligendi rerum vel et ad
          cumque commodi quo recusandae consequuntur consequatur veritatis. My
          stats number of posts {data.blogPostCount}, number of comments, number
          of likes, trips taken, trips planned, projects completed, projects in
          progress, etc. Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Corporis ullam, exercitationem necessitatibus animi debitis est
          perspiciatis unde, voluptate eligendi rerum vel et ad cumque commodi
          quo recusandae consequuntur consequatur veritatis. My stats number of
          posts {data.blogPostCount}, number of comments, number of likes, trips
          taken, trips planned, projects completed, projects in progress, etc.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
          ullam, exercitationem necessitatibus animi debitis est perspiciatis
          unde, voluptate eligendi rerum vel et ad cumque commodi quo recusandae
          consequuntur consequatur veritatis. My stats number of posts{' '}
          {data.blogPostCount}, number of comments, number of likes, trips
          taken, trips planned, projects completed, projects in progress, etc.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
          ullam, exercitationem necessitatibus animi debitis est perspiciatis
          unde, voluptate eligendi rerum vel et ad cumque commodi quo recusandae
          consequuntur consequatur veritatis. My stats number of posts{' '}
          {data.blogPostCount}, number of comments, number of likes, trips
          taken, trips planned, projects completed, projects in progress, etc.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
          ullam, exercitationem necessitatibus animi debitis est perspiciatis
          unde, voluptate eligendi rerum vel et ad cumque commodi quo recusandae
          consequuntur consequatur veritatis.
        </div>
      </div>
    </>
  )
}
