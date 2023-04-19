import type { LoaderArgs, SerializeFrom } from '@remix-run/node'
import { json } from '@remix-run/node'
import {
  Link,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError
} from '@remix-run/react'
import invariant from 'tiny-invariant'
import { PostCard } from '~/components/shared/blog-ui/post-card'
import { isAuthenticated } from '~/utils/server/auth/auth.server'
import { getUserDrafts } from '~/utils/server/post.server'

// or cloudflare/deno
import type { PostWithChildren } from '~/utils/schemas/post-schema'
import dayjs from 'dayjs'

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
  console.log(data.post, 'data')

  return (
    <div className='mx-auto flex flex-col justify-between gap-4 md:flex-row'>
      <div>
        <DraftSideBar props={data.post} />
      </div>
      <div>
        {data.post.map((draft: PostWithChildren) => (
          <PostCard
            key={draft.id}
            data={draft}
            showCategories={false}
            showComments={false}
            showFavorites={false}
            showLikes={false}
            showShare={false}
            showOptions={false}
          />
        ))}
      </div>
    </div>
  )
}

function DraftSideBar(props: { props: PostWithChildren[] }) {
  return (
    <div className='hidden w-full overflow-auto p-2 md:block'>
      <h2 className='text-sm md:text-2xl'>Draft quick links</h2>
      {props.props.map((draft: PostWithChildren) => (
        <div
          key={draft.id}
          className='flex w-full flex-row items-center justify-between gap-2 text-xs md:text-sm'
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
export function ErrorBoundary() {
  const error = useRouteError()
  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>oops</h1>
        <h1>Status:{error.status}</h1>
        <p>{error.data.message}</p>
      </div>
    )
  }
  let errorMessage = 'unknown error'
  if (error instanceof Error) {
    errorMessage = error.message
  } else if (typeof error === 'string') {
    errorMessage = error
  }

  return (
    <div>
      <h1 className='text-2xl font-bold'>uh Oh..</h1>
      <p className='text-xl'>something went wrong</p>
      <pre>{errorMessage}</pre>
    </div>
  )
}
