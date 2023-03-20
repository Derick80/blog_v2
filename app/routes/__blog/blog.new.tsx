import { Button, MultiSelect } from '@mantine/core'
import type { ActionFunction, LoaderArgs } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { json } from '@remix-run/node'
import {
  Form,
  useCatch,
  useFetcher,
  useParams,
  useRouteLoaderData
} from '@remix-run/react'
import { useState } from 'react'
import TipTap from '~/components/shared/tip-tap'
import type { Category } from '~/utils/schemas/category-schema'
import { isAuthenticated } from '~/utils/server/auth/auth.server'
import { createPost } from '~/utils/server/post.server'
import type { MetaFunction } from '@remix-run/node' // or cloudflare/deno

export const meta: MetaFunction = () => {
  return {
    title: 'Create a new post',
    description:
      "Create a new post on Derick's blog and share your knowledge with the world"
  }
}
type ActionData = {
  imageUrl?: string
}

export async function loader({ request }: LoaderArgs) {
  const user = await isAuthenticated(request)

  if (!user) {
    throw new Response('Not authenticated', { status: 401 })
  }
  return json({ user })
}

export const action: ActionFunction = async ({ request }) => {
  const user = await isAuthenticated(request)
  if (!user) {
    throw new Response('Not authenticated', { status: 401 })
  }

  const formData = await request.formData()

  const imageUrl = formData.get('imageUrl')
  const title = formData.get('title')
  const description = formData.get('description')
  const body = formData.get('body')
  const featured = Boolean(formData.get('featured'))
  const categories = formData.get('categories')

  if (
    typeof imageUrl !== 'string' ||
    typeof title !== 'string' ||
    typeof description !== 'string' ||
    typeof body !== 'string' ||
    typeof categories !== 'string'
  ) {
    return json({
      errorMsg: 'Something went wrong while uploading'
    })
  }
  const cats = categories?.split(',')
  const category = cats.map((cat) => {
    return {
      value: cat
    }
  })

  console.log(imageUrl, 'imageUrl')

  if (!imageUrl) {
    return json({
      errorMsg: 'Something went wrong while uploading'
    })
  }

  if (!title) {
    return json({
      errorMsg: 'Something went wrong while uploading'
    })
  }

  if (!featured) {
    throw new Error('featured is required')
  }

  await createPost({
    title,
    description,
    body,
    imageUrl,
    createdBy: user.userName,
    userId: user.id,
    category: category,
    featured
  })

  return redirect('/drafts')
}

export default function Uploader() {
  const { categories } = useRouteLoaderData('root') as {
    categories: Category[]
  }

  const fetcher = useFetcher<ActionData>()

  const [selected, setSelected] = useState<string>('')

  const onClick = async () =>
    fetcher.submit({
      imageUrl: 'imageUrl',
      key: 'imageUrl',
      action: '/actions/image'
    })

  return (
    <div className='mx-auto mb-7 flex w-[350px] flex-col bg-white p-2 text-slate12 dark:bg-zinc-900 dark:text-slate1 md:w-full'>
      <Form
        id='newPost'
        className='flex flex-col gap-5 rounded-xl bg-white text-slate12 shadow-md dark:bg-zinc-900 dark:text-slate-50'
        method='post'
      >
        <input
          type='hidden'
          className='rounded-xl text-slate12'
          name='imageUrl'
          value={fetcher?.data?.imageUrl}
          onChange={(e) => console.log(e.target.value)}
        />
        <label htmlFor='title'>Title</label>
        <input
          type='text'
          className='text-slate12'
          name='title'
          onChange={(e) => console.log(e.target.value)}
        />
        <label htmlFor='description'>Description</label>
        <input
          type='text'
          className='text-slate12'
          name='description'
          onChange={(e) => console.log(e.target.value)}
        />
        <label htmlFor='body'>Body</label>
        <TipTap />
        <label htmlFor='categories'>Categories</label>
        <MultiSelect
          data={categories}
          onChange={(e) => {
            setSelected(e.join(','))
          }}
        />

        <label htmlFor='Featured'>Featured</label>
        <input
          type='checkbox'
          name='featured'
          id='featured'
          onChange={(e) => console.log(e.target.checked)}
        />

        <input type='hidden' name='categories' value={selected} />
      </Form>
      <div className='flex flex-col gap-5'>
        <fetcher.Form
          method='post'
          encType='multipart/form-data'
          action='/actions/image'
          onClick={onClick}
          className='flex flex-col gap-5'
        >
          <label htmlFor='imageUrl'>Upload an Image</label>
          <input
            id='imageUrl'
            className='block rounded-xl bg-crimson12 text-slate12'
            type='file'
            name='imageUrl'
            accept='image/*'
          />
          <Button color={'blue'} variant='subtle' type='submit'>
            Upload Image
          </Button>
        </fetcher.Form>
        {fetcher.data ? (
          <div className='flex  flex-col items-center'>
            <p className='text-white'>File has been uploaded</p>
            <input
              type='hidden'
              name='imageUrl'
              value={fetcher?.data?.imageUrl}
            />
            <div className='h-[100px] w-[100px] rounded-xl bg-crimson12 text-slate12'>
              <img src={fetcher?.data?.imageUrl} alt={'#'} />
            </div>
          </div>
        ) : null}
      </div>
      <button
        type='submit'
        form='newPost'
        className='rounded-xl bg-white py-2 px-4 font-bold hover:bg-green-500 dark:bg-green-800'
      >
        Save
      </button>
    </div>
  )
}
export function CatchBoundary() {
  const caught = useCatch()
  const params = useParams()

  switch (caught.status) {
    case 404: {
      return <h2>User with ID "{params.userId}" not found!</h2>
    }
    default: {
      // if we don't handle this then all bets are off. Just throw an error
      // and let the nearest ErrorBoundary handle this
      throw new Error(`${caught.status} not handled`)
    }
  }
}

// this will handle unexpected errors (like the default case above where the
// CatchBoundary gets a response it's not prepared to handle).
export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error)

  return (
    <div>
      <pre>{JSON.stringify(error, null, 2)}</pre>
    </div>
  )
}
