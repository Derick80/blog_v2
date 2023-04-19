import type { ActionArgs, LoaderArgs } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import {
  Form,
  isRouteErrorResponse,
  useFetcher,
  useLoaderData,
  useNavigation,
  useRouteError
} from '@remix-run/react'
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
import { MultiSelect, Switch } from '@mantine/core'
import TipTap from '~/components/shared/tip-tap'
import { useState } from 'react'
import getAllCategories from '~/utils/server/categories.server'
import { useOptionalUser, validateAction } from '~/utils/utilities'
// or cloudflare/deno
import { badRequest } from 'remix-utils'
import ImageUploader from '~/components/shared/image-fetcher'
import { z } from 'zod'
import Button from '~/components/shared/button'

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

const schema = z.object({
  action: z.string().min(1).max(50),
  postId: z.string().min(1).max(50),
  userId: z.string().min(1).max(50),
  title: z.string().min(1).max(100),
  createdBy: z.string().min(1).max(150),
  description: z.string().min(1).max(150),
  body: z.string().min(1).max(10000),
  imageUrl: z.string().min(1).max(500),
  featured: z.coerce.boolean(),
  categories: z.string().min(1).max(50)
})

export type ActionInput = z.TypeOf<typeof schema>

export async function action({ request }: ActionArgs) {
  const user = await isAuthenticated(request)
  invariant(user, 'user is required')
  const { formData, errors } = await validateAction<ActionInput>({
    request,
    schema
  })

  if (errors) {
    return json({ errors }, { status: 400 })
  }

  const {
    action,
    postId,
    userId,
    title,
    createdBy,
    description,
    body,
    imageUrl,
    featured,
    categories
  } = formData as ActionInput

  const cats = categories?.split(',')
  const category = cats.map((cat) => {
    return {
      value: cat
    }
  })

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
        category,
        featured
      })
      return redirect(`/blog/`)

    case 'publish':
      await publishPost(postId)
      return redirect(`/blog`)
    case 'unpublish':
      await unPublishPost(postId)
      return redirect(`/blog/${postId}`)
    case 'delete':
      await deletePost(postId)
      return redirect(`/blog`)
  }
}

export default function EditPost() {
  const data = useLoaderData<typeof loader>()

  const user = useOptionalUser()
  const saveNav = useNavigation()
  const pubNav = useNavigation()
  const unPubNav = useNavigation()
  const deleteNav = useNavigation()

  const text =
    saveNav.state === 'submitting'
      ? 'Saving...'
      : saveNav.state === 'loading'
      ? 'Saved!'
      : 'Save'

  const publishText =
    pubNav.state === 'submitting'
      ? 'Publishing...'
      : pubNav.state === 'loading'
      ? 'Published!'
      : 'Publish'

  const unpublishText =
    unPubNav.state === 'submitting'
      ? 'Unpublishing...'
      : unPubNav.state === 'loading'
      ? 'Unpublished!'
      : 'Unpublish'

  const deleteText =
    deleteNav.state === 'submitting'
      ? 'Deleting...'
      : deleteNav.state === 'loading'
      ? 'Deleted!'
      : 'Delete'

  const imageFetcher = useFetcher()
  const onClick = async () =>
    imageFetcher.submit({
      imageUrl: 'imageUrl',
      key: 'imageUrl',
      action: '/actions/cloudinary'
    })
  const {
    title,
    description,
    body,
    imageUrl,
    categories,
    id,
    published,
    userId,
    featured
  } = data.post

  const [selected, setSelected] = useState<string[]>(
    categories.map((item) => item.value)
  )

  const pickedCategories = categories.map((item) => item.value)

  const mainCategories = data.allCategories.map((item) => {
    return item.value
  })

  const [url, setUrl] = useState(imageUrl)
  return (
    <div className='mx-auto mb-7 mt-5 flex w-full flex-col items-center border-2  p-2 text-slate12  '>
      <div className='flex w-full flex-col items-center justify-center'>
        <Form
          method='post'
          action={`/blog/${id}/edit`}
          id='editPost'
          className='flex flex-col gap-5 rounded-xl  text-slate12  '
        >
          <input type='hidden' name='createdBy' value={user?.userName} />
          <input type='hidden' name='postId' value={id} />
          <input type='hidden' name='userId' value={userId} />

          <label htmlFor='title'>Title</label>
          <input
            type='text'
            className='rounded-md border text-sm text-slate12'
            name='title'
            id='title'
            defaultValue={title}
          />

          <label htmlFor='description'>Description</label>
          <input
            type='text'
            className='rounded-md border text-sm text-slate12'
            name='description'
            id='description'
            defaultValue={description}
          />

          <label htmlFor='body'>Post Content</label>
          {body && <TipTap content={body} />}
          <input type='hidden' name='body' defaultValue={body} />

          <div className='flex flex-col gap-2 text-slate12'>
            <label className='text-slate12' htmlFor='categories'>
              Categories
            </label>

            <MultiSelect
              name='categories'
              id='categories'
              data={mainCategories}
              defaultValue={selected}
            />
          </div>
          <div className='mb-5 mt-5 flex flex-row items-center justify-end gap-2 text-slate12'>
            <label htmlFor='featured'>Featured</label>
            <Switch
              name='featured'
              onChange={(e) => console.log(e.target.value)}
              defaultChecked={false}
            />
          </div>
          <input type='hidden' name='imageUrl' id='imageUrl' value={url} />
          <img src={url} alt='post' className='w-1/2' />
        </Form>

        <ImageUploader onClick={onClick} setUrl={setUrl} />
        <div className='flex flex-row items-center justify-end gap-2 text-slate12'>
          <Button
            type='submit'
            name='action'
            value='save'
            form='editPost'
            variant='primary_filled'
            size='small'
          >
            {text}
          </Button>
          {published ? (
            <Button
              type='submit'
              form='editPost'
              name='action'
              value='unpublish'
              variant='warning'
              size='small'
            >
              {unpublishText}
            </Button>
          ) : (
            <Button
              type='submit'
              form='editPost'
              name='action'
              value='publish'
              variant='primary_filled'
              size='small'
            >
              {publishText}
            </Button>
          )}
          <Button
            type='submit'
            form='editPost'
            name='action'
            value='delete'
            variant='danger_filled'
            size='small'
          >
            {deleteText}
          </Button>
        </div>
      </div>
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
