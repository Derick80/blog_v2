import type { ActionArgs, LoaderArgs } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import {
  Form,
  NavLink,
  useActionData,
  useCatch,
  useFetcher,
  useLoaderData,
  useNavigation
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
import {
  validateSmallTextLength,
  validateText
} from '~/utils/validators.server'
import { Button, Flex, MultiSelect, Textarea } from '@mantine/core'
import TipTap from '~/components/shared/tip-tap'
import { useState } from 'react'
import getAllCategories from '~/utils/server/categories.server'
import { useOptionalUser } from '~/utils/utilities'
import type { MetaFunction } from '@remix-run/node' // or cloudflare/deno
import BlogNav from '~/components/shared/blog-ui/blog-admin-menu'
import { wait } from '~/utils/server/functions.server'
import { badRequest } from 'remix-utils'
import { TrashIcon } from '@radix-ui/react-icons'

export const meta: MetaFunction = () => {
  return {
    title: "Edit Post | Derick's Blog",
    description:
      "Edit a post on Derick's blog and share your knowledge with the world"
  }
}
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
  const action = formData.get('_action')
  const postId = formData.get('postId')
  const userId = formData.get('userId')
  const title = formData.get('title')
  const createdBy = formData.get('createdBy')
  const description = formData.get('description')
  const body = formData.get('body')
  const imageUrl = formData.get('imageUrl')
  const featured = Boolean(formData.get('featured'))
  const categories = formData.get('categories')

  if (
    typeof body !== 'string' ||
    typeof categories !== 'string' ||
    typeof action !== 'string' ||
    typeof postId !== 'string' ||
    typeof userId !== 'string' ||
    typeof title !== 'string' ||
    typeof createdBy !== 'string' ||
    typeof description !== 'string' ||
    typeof imageUrl !== 'string'
  ) {
    return badRequest({
      fieldErrors: null,
      fields: null,
      formError: 'Invalid form data'
    })
  }

  const fieldErrors = {
    title: validateSmallTextLength(title),
    description: validateText(description),
    body: validateText(body),
    imageUrl: validateText(imageUrl),
    action: validateText(action),
    createdBy: validateText(createdBy)
  }
  const fields = {
    title,
    description,
    body,
    imageUrl,
    createdBy,
    categories,
    action,
    featured
  }
  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({
      fieldErrors,
      fields,
      formError: null
    })


  }
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
      return redirect(`/blog/${postId}`)

    case 'publish':
      await publishPost(postId)
      return redirect(`/blog/${postId}`)
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

  const actionData = useActionData<typeof action>()
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

  const [formData, setFormData] = useState({
    title,
    description,
    body,
    imageUrl,
    categories: pickedCategories,
    id,
    published,
    featured
  })

  return (
    <div className='mt-10 flex w-full flex-col items-center'>
      <div className='flex w-full flex-col items-center justify-center'>
        {user?.role === 'ADMIN' && <BlogNav />}

        <Form
          method='post'
          action={`/blog/${id}/edit`}
          id='editPost'
          className='flex w-[350px] flex-col md:w-1/2'
        >
          <input type='hidden' name='createdBy' value={user?.userName} />
          <input type='hidden' name='postId' value={id} />
          <input type='hidden' name='userId' value={userId} />

          <label htmlFor='title'>Title</label>
          <input
            type='text'
            className='text-slate12'
            name='title'
            id='title'
            defaultValue={actionData ? actionData.title : formData.title}
          />
          {actionData?.fieldErrors?.title && (
            <p className='text-red-500'>{actionData.fieldErrors.title}</p>
          )}
          <label htmlFor='description'>Description</label>
          <input
            type='text'
            className='text-slate12'
            name='description'
            id='description'
            defaultValue={actionData ? actionData.description : formData.description}
          />
          {actionData?.fieldErrors?.description && (
            <p className='text-red-500'>{actionData.fieldErrors.description}</p>
          )}
          <label htmlFor='body'>Post Content</label>
          {body && <TipTap content={body} />}
          <input type='hidden' name='body' defaultValue={body} />
          <label htmlFor='featured'>Featured</label>
          <input
            type='checkbox'
            name='featured'
            id='featured'
            defaultChecked={formData.featured || false}
          />

          <MultiSelect
            label='Categories'
            name='categories'
            id='categories'
            data={mainCategories}
            defaultValue={selected}
          />

          <input
            type='hidden'
            name='imageUrl'
            id='imageUrl'
            value={imageFetcher.data?.imageUrl || imageUrl}
          />
        </Form>

        <div className='flex flex-col gap-2'>
          <imageFetcher.Form
            method='post'
            encType='multipart/form-data'
            action='/actions/cloudinary'
            className='flex w-[350px] flex-col md:w-1/2'
            onClick={onClick}
          >
            <label htmlFor='imageUrl' className='text-sm font-semibold'>
              Upload a Project Image
            </label>
            <input
              type='file'
              name='imageUrl'
              id='imageUrl'
              className='rounded-md p-2 shadow-md'
              accept='image/*'
            />
            <button>Upload</button>
          </imageFetcher.Form>
          {imageFetcher.data ? (
            <div className='items-c enter flex flex-col'>
              <p className='text-sm text-gray-500'>Image Uploaded</p>
              <input
                type='hidden'
                name='imageUrl'
                value={imageFetcher?.data?.imageUrl}
              />
              <div className='h-[100px] w-[100px] rounded-xl bg-crimson12 text-slate12'>
                <img src={imageFetcher?.data?.imageUrl} alt={'#'} />
              </div>
            </div>
          ) : null}
        </div>
        <button
          type='submit'
          name='_action'
          value='save'
          form='editPost'
          className='rounded-xl bg-white py-2 px-4 font-bold hover:bg-green-800 dark:bg-green-500'
        >
          {text}
        </button>
        {published ? (
          <button
            type='submit'
            form='editPost'
            name='_action'
            value='unpublish'
          >
            {unpublishText}
          </button>
        ) : (
          <button type='submit' form='editPost' name='_action' value='publish'>
            {publishText}
          </button>
        )}
        <button type='submit'
        form='editPost'
        name='_action' value='delete'>
          {deleteText}
        </button>
      </div>
    </div>
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
