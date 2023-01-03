import { ActionArgs, LoaderArgs, redirect } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'
import { badRequest } from 'remix-utils'
import { BlogCard } from '~/components/shared/blog-card'
import { isAuthenticated } from '~/models/auth/auth.server'
import { flashAndCommit } from '~/models/auth/session.server'
import { createComment } from '~/models/comments.server'
import { getPosts } from '~/models/post.server'
import { validateText } from '../validators.server'

export async function loader({}: LoaderArgs) {
  const posts = await getPosts()
  const comments = posts.map((post) => post.comments || [])
  const commentsByParentId = comments
    .map((comment) =>
      comment.map((comment) => comment.parentId).filter((comment) => comment)
    )
    .flat()

  const rootcomments = comments.map((comment) =>
    comment.filter((comment) => !commentsByParentId.includes(comment.id))
  )
  console.log('rootcomments', rootcomments)

  return json({ posts, rootcomments, comments, commentsByParentId })
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
    <div className='mt-10 flex flex-col items-center justify-center'>
      {data.posts.map((post) => (
        <BlogCard key={post.id} posts={post} rootComments={data.rootcomments} />
      ))}

      <Outlet />
    </div>
  )
}
