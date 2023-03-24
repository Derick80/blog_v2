import { Drawer, Menu } from '@mantine/core'
import { ChevronLeftIcon, DropdownMenuIcon } from '@radix-ui/react-icons'
import type { LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import React from 'react'
import BlogNav from '~/components/shared/blog-ui/blog-admin-menu'
import { PostCard } from '~/components/shared/blog-ui/post-card'
import StatsCard from '~/components/shared/blog-ui/stats-card'
import { getHeroPost } from '~/utils/server/post.server'

export async function loader({ request }: LoaderArgs) {
  const post = await getHeroPost()

  return json({ post })
}

export default function Index() {
  const [open, setOpen] = React.useState(false)
  const data = useLoaderData<typeof loader>()
  return (
    <div className='flex grow flex-col items-center gap-4 '>
      <h1 className='mb-5 text-3xl font-bold'>Latest Post</h1>
<button className='flex items-center text-crimson9'
        onClick={() => setOpen(!open)}
      >
                  <ChevronLeftIcon />

       <p
          className='text-sm font-bold'
          aria-label='Open drawer'
          aria-controls='drawer'
          >Menu</p>
      </button>
      <Drawer
        opened={ open }
        title='Drawer title'
        position='left'
        size='md'

        onClose={ () => setOpen(false) }
        withOverlay
        className='text-black dark:text-slate-50'



>
 <StatsCard />
      <BlogNav />

</Drawer>

    <div className='flex flex-col items-center gap-4'>
      {data.post &&
        data.post.map((item) => (
          <PostCard
            key={item.id}
            data={item}
            showCategories={true}
            showComments={false}
            showFavorites={true}
            showLikes={true}
            showOptions={true}
            showShare={true}
          />
        ))}
        </div>

    </div>
  )
}
