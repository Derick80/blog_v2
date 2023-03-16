import type { ActionArgs, LoaderArgs } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import {
  Form,
  NavLink,
  useCatch,
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
import { validateText } from '~/utils/validators.server'
import { Button, Flex, MultiSelect, Textarea } from '@mantine/core'
import TipTap from '~/components/shared/tip-tap'
import { useState } from 'react'
import getAllCategories from '~/utils/server/categories.server'
import { useOptionalUser } from '~/utils/utilities'
import type { MetaFunction } from '@remix-run/node' // or cloudflare/deno

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
  const action = formData.get('_action') as string
  const postId = formData.get('postId') as string
  const userId = formData.get('userId') as string
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const body = formData.get('body')?.toString()
  const imageUrl = formData.get('imageUrl') as string
  const featured = Boolean(formData.get('featured'))
  const categories = formData.get('categories') as string
console.log(body, 'featured');
if(typeof body !== 'string') {
  throw new Error('body is required')
}
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
        category,
        featured,
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
  const user = useOptionalUser()
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
console.log(data.post.featured, 'featured');

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
    featured,
  })

  return (
    <div className='mt-10 flex w-full flex-col items-center'>
      <div className='flex w-full flex-col items-center justify-center'>
        {user?.role === 'ADMIN' && (
          <div className='flex gap-5'>
            <NavLink prefetch='intent' to='/blog/new'>
              <Button size='sm' variant='subtle'>
                New post
              </Button>
            </NavLink>
            <NavLink prefetch='intent' to='/drafts'>
              <Button size='sm' variant='subtle'>
                Drafts
              </Button>
            </NavLink>
            <NavLink prefetch='intent' to='/blog/categories'>
              <Button size='sm' variant='subtle'>
                Manage categories
              </Button>
            </NavLink>
          </div>
        )}

        <Form
          method='post'
          action={`/blog/${id}/edit`}
          className='flex w-[350px] md:w-1/2 flex-col'
        >
          <input type='hidden' name='postId' value={id} />
          <input type='hidden' name='userId' value={userId} />

          <label htmlFor='title'>Title</label>
          <input
            type='text'
            className='text-slate12'

            name='title'
            id='title'
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <label htmlFor='description'>Description</label>
          <input
            type='text'
            className='text-slate12'

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
          <label htmlFor='featured'>Featured</label>
          <input type='checkbox' name='featured' id='featured'
            checked={formData.featured || false}
            onChange={(e) => {
              console.log(e.target.checked);
              setFormData({ ...formData, featured: e.target.checked })
            }}

          />

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
          <button
            type='submit'
            name='_action'
            value='save'
            className='rounded-xl bg-white py-2 px-4 font-bold hover:bg-green-800 dark:bg-green-500'
          >
            {text}
          </button>
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
