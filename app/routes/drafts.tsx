import type { LoaderArgs, SerializeFrom } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Link, useCatch, useLoaderData } from '@remix-run/react'
import invariant from 'tiny-invariant'
import { PostCard } from '~/components/shared/blog-ui/post-card'
import { isAuthenticated } from '~/utils/server/auth/auth.server'
import { getUserDrafts } from '~/utils/server/post.server'

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
      <div className='mx-auto flex mt-10 max-w-screen-2xl flex-row gap-2'>
        <div className='flex flex-col gap-2 md:grid md:grid-cols-12'>
          <div className='col-span-3 hidden h-[100px] w-full grow flex-col  md:flex md:h-full'>
            <Sidebar props={data.post} />
          </div>
          <div className='col-span-11 col-start-4 flex w-full grow  flex-wrap gap-2'>
            {data.post.map((draft: PostWithChildren) => (
              <PostCard
                key={draft.id}
                data={draft}
                showCategories={true}
                showComments={true}
                showLikes={true}
                showFavorites={true}
                showOptions={true}
                showShare={true}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

function Sidebar(props: { props: PostWithChildren[] }) {

  return (
    <div className='prose overflow-auto p-2'>
      <h2 className='text-sm md:text-2xl'>Draft quick links</h2>
      {props.props.map((draft: PostWithChildren) => (
        <div
          key={draft.id}
          className='prose flex w-full flex-row items-center justify-between gap-2 text-xs md:text-sm'
        >
          <div className='flex flex-col'>
            <h3 className='m-0 text-xs md:text-sm'>Title</h3>
            <Link to={`/blog/${draft.id}`} className='m-0'>
              <h2 className='prose-h2: prose m-0 text-xs'>
                {draft.title.slice(0, 30)}...
              </h2>
            </Link>
          </div>
          <div className='flex flex-col'>
            <h3 className='m-0 text-xs md:text-sm'>Created</h3>
            <p className='m-0 text-xs text-gray-500 md:text-sm'>
              {dayjs(draft.createdAt).format('MMM d')}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
export function CatchBoundary () {
  const caught = useCatch()

  return (
    <div>
      <h1>Caught</h1>
      <p>Status: { caught.status }</p>
      <pre>
        <code>{ JSON.stringify(caught.data, null, 2) }</code>
      </pre>
    </div>
  )
}