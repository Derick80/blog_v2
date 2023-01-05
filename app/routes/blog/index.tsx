import { ActionArgs, LoaderArgs, redirect } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'
import { badRequest } from 'remix-utils'
import { Card } from '~/components/shared/blog-ui/card'
import { isAuthenticated } from '~/models/auth/auth.server'
import { flashAndCommit } from '~/models/auth/session.server'
import { createComment } from '~/models/comments.server'
import { getPosts } from '~/models/post.server'
import { validateText } from '../validators.server'

export async function loader() {
  const { posts, commentsByParentId, postsWithComments } = await getPosts()

  const comments = posts.map((item) => item.comments)

  return json({ posts, comments, commentsByParentId, postsWithComments })
}
export async function action({ request, params }: ActionArgs) {
  const user = await isAuthenticated(request)
  const userId = user?.id
  const createdBy = user?.userName
  const formData = await request.formData()
  const action = formData.get('_action')

  const message = formData.get('message')
  const postId = formData.get('postId')
  console.log('postId: ', postId)

  if (
    typeof message !== 'string' ||
    typeof userId !== 'string' ||
    typeof postId !== 'string' ||
    typeof createdBy !== 'string'
  ) {
    return badRequest({ message: 'Invalid comment t' })
  }

  const errors = {
    message: validateText(message),
    userId: validateText(userId),
    postId: validateText(postId),
    createdBy: validateText(createdBy)
  }

  if (Object.values(errors).some(Boolean))
    return json(
      {
        errors,
        fields: {
          message,
          userId,
          postId,
          createdBy
        },
        form: action
      },
      {
        status: 400
      }
    )

  switch (action) {
    case 'create' as string:
      await createComment({ message, userId, postId, createdBy })
      const headers = await flashAndCommit(
        request,
        'Your comment has been added'
      )

      return redirect(`/blog`, { headers })
  }
}

export default function BlogRoute() {
  const data = useLoaderData<typeof loader>()
  return (
    <div className='mx-auto flex w-fit flex-col gap-5'>
      {data.posts.map((post) => (
        <Card key={post.id} post={post} />
      ))}

      <Outlet />
    </div>
  )
}
