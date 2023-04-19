import { useAuth } from '@clerk/remix'
import { getAuth } from '@clerk/remix/ssr.server'
import { LoaderArgs, json } from '@remix-run/node'
import {
  isRouteErrorResponse,
  useLoaderData,
  useRouteError
} from '@remix-run/react'
import BlogPreview from '~/components/shared/blog-ui/blog-preview'
import getAllCategories from '~/utils/server/categories.server'
import { getPosts } from '~/utils/server/post.server'

export function meta() {
  return [
    { title: 'Blog' },
    { name: 'description', content: 'Blog Main Page' },
    { property: 'og:title', content: 'Blog' },
    { property: 'og:description', content: 'Blog index page' }
  ]
}

export async function loader({ request, params, context}:LoaderArgs) {
  
  const post = await getPosts()

  if (!post) throw new Error('Error')

  // get all Categoiries for posts use this for useMatches, etc
  const categories = await getAllCategories()
  // get all comments for posts use this for useMatches, etc

  return json({ post, categories })
}

export default function Index() {
  const data = useLoaderData<typeof loader>()

  return (
    <div className='mx-auto flex w-full flex-col items-center gap-4 p-2'>
      {' '}
      {data.post.map((post) => (
        <BlogPreview key={post.id} post={post} showActions={true} />
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
