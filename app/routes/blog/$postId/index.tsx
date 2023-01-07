import { LoaderArgs, json, ActionArgs, redirect } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { badRequest } from 'remix-utils'
import { Card } from '~/components/shared/blog-ui/card'
import { isAuthenticated } from '~/models/auth/auth.server'
import { flashAndCommit } from '~/models/auth/session.server'
import { createComment } from '~/models/comments.server'
import { getPostById } from '~/models/post.server'
import { validateText } from '~/routes/validators.server'

export async function loader({ request, params }: LoaderArgs) {
  const postId = params?.postId
  if (!postId) return badRequest({ message: 'Invalid post' })

  const user = await isAuthenticated(request)
  if (!user) return badRequest({ message: 'Invalid user' })

  const post = await getPostById(postId)

  return json({ postId, user, post })
}

export async function action({ request, params }: ActionArgs) {
  const user = await isAuthenticated(request)
  const postId = params?.postId
  const userId = user?.id
  const createdBy = user?.userName
  const formData = await request.formData()
  const action = formData.get('_action')

  const message = formData.get('message')
  console.log(message)

  if (
    typeof message !== 'string' ||
    typeof userId !== 'string' ||
    typeof postId !== 'string' ||
    typeof createdBy !== 'string' ||
    typeof action !== 'string'
  ) {
    return badRequest({ message: 'Invalid comment' })
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

      return redirect(`/blog/${postId}`, { headers })
  }
}

export default function Index() {
  const data = useLoaderData<typeof loader>()
  return (
    <div className='grid-cols-repeat(minmax(300px, 1fr)) grid items-start gap-4'>
      <Card post={data.post} />
    </div>
  )
}
