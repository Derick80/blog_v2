import type { ActionArgs, LoaderArgs } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { badRequest } from 'remix-utils'
import invariant from 'tiny-invariant'
import { isAuthenticated } from '~/models/auth/auth.server'
import Edit from '~/components/shared/blog-ui/edit-post'
import type { CategoryForm } from '~/models/post.server'
import {
  deletePost,
  getPostById,
  publishPost,
  savePost,
  unPublishPost
} from '~/models/post.server'
import { validateText } from '~/routes/validators.server'

export async function loader({ params, request }: LoaderArgs) {
  const postId = params.postId
  invariant(postId, 'postId is required')
  const post = await getPostById(postId)

  return json({ post })
}

export async function action({ params, request }: ActionArgs) {
  const postId = params.postId
  invariant(postId, 'postId is required')
  const user = await isAuthenticated(request)
  invariant(user, 'user is required')
  const userId = user.id
  const formData = await request.formData()
  const action = formData.get('_action')
  const title = formData.get('title')
  const description = formData.get('description')
  const body = formData.get('body')
  const imageUrl = formData.get('imageUrl')
  const categories = formData.getAll('categories')
  const createdBy = user.userName
  const correctedCategories = categories.map((item) => {
    return { value: item, label: item }
  }) as CategoryForm

  if (
    typeof title !== 'string' ||
    typeof description !== 'string' ||
    typeof body !== 'string' ||
    typeof imageUrl !== 'string' ||
    typeof action !== 'string' ||
    createdBy !== 'string' ||
    userId !== 'string'
  ) {
    return badRequest({ error: 'Invalid form data' })
  }

  const formErrors = {
    postId: validateText(postId),
    title: validateText(title),
    description: validateText(description),
    body: validateText(body),
    imageUrl: validateText(imageUrl),
    action: validateText(action),
    createdBy: validateText(createdBy),
    userId: validateText(userId)
  }
  const fields = {
    postId,
    title,
    description,
    body,
    imageUrl,
    createdBy,
    userId,
    correctedCategories
  }
  if (Object.values(formErrors).some(Boolean)) {
    return json(
      {
        formErrors,
        fields: {
          postId,
          userId,
          title,
          description,
          body,
          imageUrl,
          createdBy
        },
        form: action
      },
      { status: 400 }
    )
  }

  switch (action) {
    case 'save':
      await savePost({
        ...fields
      })
      return redirect(`/blog/${postId}`)

    case 'publish':
      await publishPost(postId)
      return redirect(`/blog/${postId}`)
    case 'unpublish':
      await unPublishPost(postId)
      return redirect(`/blog/${postId}`)
    case 'delete':
      await deletePost(postId)
      return redirect(`/`)
  }
}

export default function EditPost() {
  const post = useLoaderData<typeof loader>()

  return <Edit post={post} />
}
