import type { ActionArgs, LoaderArgs } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { Form, useCatch, useLoaderData, useNavigation } from '@remix-run/react'
import invariant from 'tiny-invariant'
import { isAuthenticated } from '~/utils/server/auth/auth.server'
import { getPostToEdit } from '~/utils/server/post.server'
import {
  deletePost,
  publishPost,
  savePost,
  unPublishPost
} from '~/utils/server/post.server'
import { validateText } from '~/utils/validators.server'
import { Button, Flex, MultiSelect, Stack, Textarea } from '@mantine/core'
import TipTap from '~/components/shared/tip-tap'
import { useState } from 'react'
import getAllCategories from '~/utils/server/categories.server'
import Dropdown from '~/components/shared/blog-ui/dropdown'

export async function loader({ params, request }: LoaderArgs) {
  const user = await isAuthenticated(request)
  if (!user) {
    throw new Response('Not authenticated', {
      status: 401
    })
  }
  const postId = params.postId
  const allCategories = await getAllCategories()
  invariant(postId, 'postId is required')
  const post = await getPostToEdit(postId)
  invariant(post, 'post is required')

  return json({ post, allCategories })
}

export async function action({ params, request }: ActionArgs) {
  const user = await isAuthenticated(request)
  invariant(user, 'user is required')
  const formData = await request.formData()
  const action = formData.get('_action') as string
  const postId = formData.get('postId') as string
  const userId = formData.get('userId') as string
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const body = formData.get('body')
  const imageUrl = formData.get('imageUrl') as string
  const categories = formData.get('categories') as string

  const createdBy = user.userName

  const cats = categories?.split(',')
  const category = cats.map((cat) => {
    return {
      value: cat
    }
  })
  const formErrors = {
    title: validateText(title),
    description: validateText(description),
    body: validateText(body),
    imageUrl: validateText(imageUrl),
    action: validateText(action),
    createdBy: validateText(createdBy)
  }

  if (Object.values(formErrors).some(Boolean)) {
    return json(
      {
        formErrors,
        fields: {
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
        postId,
        title,
        description,
        body,
        imageUrl,
        createdBy,
        userId,
        category
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
  const navigate = useNavigation()
  const text =
    navigate.state === 'submitting'
      ? 'Saving...'
      : navigate.state === 'loading'
      ? 'Saved!'
      : 'Save'

  const publishText =
    navigate.state === 'submitting'
      ? 'Publishing...'
      : navigate.state === 'loading'
      ? 'Published!'
      : 'Publish'

  const unpublishText =
    navigate.state === 'submitting'
      ? 'Unpublishing...'
      : navigate.state === 'loading'
      ? 'Unpublished!'
      : 'Unpublish'

  const deleteText =
    navigate.state === 'submitting'
      ? 'Deleting...'
      : navigate.state === 'loading'
      ? 'Deleted!'
      : 'Delete'
  const data = useLoaderData<typeof loader>()

  const {
    title,
    description,
    body,
    imageUrl,
    categories,
    id,
    published,
    userId
  } = data.post

  const [selected, setSelected] = useState<string[]>(
    categories.map((item) => item.value)
  )

  const pickedCategories = categories.map((item) => item.value)

  const mainCategories = data.allCategories.map((item) => {
    return item.value
  })

  const [formData, setFormData] = useState({
    title,
    description,
    body,
    imageUrl,
    categories: pickedCategories,
    id,
    published
  })

  return (
    <Stack align='center' className='mt-10 w-full'>
      <Flex direction={'column'}>
        <Dropdown />

        <Form
          method='post'
          action={`/blog/${id}/edit`}
          className='flex w-[350px] flex-col'
        >
          <input type='hidden' name='postId' value={id} />
          <input type='hidden' name='userId' value={userId} />
          <Textarea
            label='Title'
            name='title'
            id='title'
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <Textarea
            label='Description'
            name='description'
            id='description'
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />

          <label htmlFor='body'>Post Content</label>
          {body && <TipTap content={body} />}
          <input type='hidden' name='body' value={body} />

          <MultiSelect
            label='Categories'
            name='categories'
            id='categories'
            data={mainCategories}
            value={selected}
            onChange={(e) => {
              setSelected(e)
              setFormData({ ...formData, categories: e })
            }}
          />

          <Flex justify={'center'}>
            <input
              type='hidden'
              name='imageUrl'
              id='imageUrl'
              value={imageUrl}
            />
          </Flex>
          <Button type='submit' name='_action' value='save'>
            {text}
          </Button>
          {published ? (
            <Button type='submit' name='_action' value='unpublish'>
              {unpublishText}
            </Button>
          ) : (
            <Button type='submit' name='_action' value='publish'>
              {publishText}
            </Button>
          )}
          <Button type='submit' name='_action' value='delete'>
            {deleteText}
          </Button>
        </Form>
      </Flex>
    </Stack>
  )
}
export function CatchBoundary() {
  const caught = useCatch()

  return (
    <div>
      <h1>Caught</h1>
      <p>Status: {caught.status}</p>
      <pre>
        <code>{JSON.stringify(caught.data, null, 2)}</code>
      </pre>
    </div>
  )
}
