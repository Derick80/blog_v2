import { LoaderArgs, json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { badRequest } from 'remix-utils'
import { Card } from '~/components/shared/blog-ui/card'
import { isAuthenticated } from '~/models/auth/auth.server'
import { getPostById } from '~/models/post.server'

export async function loader({ request, params }: LoaderArgs) {
  const postId = params?.postId
  if (!postId) return badRequest({ message: 'Invalid post' })

  const user = await isAuthenticated(request)
  if (!user) return badRequest({ message: 'Invalid user' })

  const post = await getPostById(postId)

  return json({ postId, user, post })
}

export default function Index() {
  const data = useLoaderData<typeof loader>()
  return (
    <div className='grid grid-cols-6 gap-4 place-items-center'>
      {data.post && (
        <div className='col-span-4 col-start-2'>
          <Card
            key={data.post.id}
            post={data.post}
            user={data.post.user}
            showComments={true}
            showFavorites={true}
            showLikes={true}
            showShare={true}
            showOptions={true}
          />
        </div>
      )}
    </div>
  )
}
