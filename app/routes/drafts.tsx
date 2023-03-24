import type { LoaderArgs, SerializeFrom } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import invariant from 'tiny-invariant'
import { PostCard } from '~/components/shared/blog-ui/post-card'
import { isAuthenticated } from '~/utils/server/auth/auth.server'
import { getUserDrafts } from '~/utils/server/post.server'
import { Center } from '@mantine/core'

import type { MetaFunction } from '@remix-run/node' // or cloudflare/deno
import type { PostWithChildren } from '~/utils/schemas/post-schema'
import dayjs from 'dayjs'

export const meta: MetaFunction = () => {
  return {
    title: "Work on your drafts | Derick's Blog | Drafts",
    description: 'Work on your drafts and share your knowledge with the world'
  }
}
export async function loader({ request }: LoaderArgs) {
  const user = await isAuthenticated(request)
  if (!user) {
    return { redirect: '/login' }
  }

  const post = await getUserDrafts(user.id)
  invariant(post, 'drafts are required')
  return json({ post })
}

export default function Drafts() {
  const data = useLoaderData<SerializeFrom<{ post: PostWithChildren[] }>>()

  return (
    <>
      <div className='max-w-screen-2xl flex flex-row mx-auto gap-2'>

<div className='flex flex-col md:grid md:grid-cols-12 gap-2'>

        <div className='col-span-3 hidden md:flex flex-col w-full h-[100px] md:h-full grow bg-green-500'>

          <Sidebar props={ data.post } />
        </div>
<div
          className='col-span-11 col-start-4 flex grow bg-red-500  gap-2 flex-wrap w-full'
>

          {data.post.map((draft: PostWithChildren) => (
            <PostCard
              key={ draft.id }
              data={ draft }
              showCategories={ true }
              showComments={ true }
              showLikes={ true }
              showFavorites={ true }
              showOptions={ true }
              showShare={ true }
            />
          ))

          }
          </div>
        </div>
      </div>
    </>
  )
}

function Sidebar(props: { props:PostWithChildren[] }) {
  console.log(props);
console.log(Array.isArray(props.props));


  return (
    <div
    className='prose p-2 overflow-auto'
    >
      <h2 className='text-sm md:text-2xl'>Draft quick links</h2>
        {props.props.map((draft: PostWithChildren) => (
      <div
      key={draft.id}
      className='flex prose w-full justify-between flex-row items-center gap-2 text-xs md:text-sm'>
        <div className='flex flex-col'>
              <h3 className='text-xs md:text-sm m-0'>Title</h3>
              <Link

                to={ `/drafts/${draft.id}` } className='m-0'>
                <h2 className='text-xs m-0 prose prose-h2:'>{ draft.title.slice(0, 30) }...</h2>
              </Link>
        </div>
            <div className='flex flex-col'>
              <h3 className='text-xs md:text-sm m-0'>Created</h3>
            <p className='text-xs md:text-sm m-0 text-gray-500'>{ dayjs(draft.createdAt).format("MMM d") }</p>
            </div>
      </div>
        ))}


    </div>
  )
}
