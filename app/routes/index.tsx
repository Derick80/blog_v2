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
      <div className='container mx-auto'>
        <div className='flex rounded-lg bg-zinc-200 dark:bg-zinc-400'>
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
