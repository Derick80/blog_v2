import { MultiSelect, Switch } from '@mantine/core'
import type { ActionFunction, LoaderArgs } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { json } from '@remix-run/node'
import {
  Form,
  useActionData,
  useCatch,
  useFetcher,
  useNavigation,
  useParams,
  useRouteLoaderData
} from '@remix-run/react'
import { useState } from 'react'
import TipTap from '~/components/shared/tip-tap'
import type { Category } from '~/utils/schemas/category-schema'
import { isAuthenticated } from '~/utils/server/auth/auth.server'
import { createPost } from '~/utils/server/post.server'
import type { MetaFunction } from '@remix-run/node' // or cloudflare/deno
import { badRequest } from 'remix-utils'
import {
  validateLargeTextLength,
  validateText
} from '~/utils/validators.server'

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
    return badRequest({
      fieldErrors: null,
      fields: null,
      formError: 'Invalid form data'
    })
  }

  const fieldErrors = {
    title: validateLargeTextLength(title),
    description: validateText(description),
    body: validateLargeTextLength(body),
    imageUrl: validateText(imageUrl),
    categories: validateText(categories)
  }

  const fields = {
    title,
    description,
    body,
    imageUrl,
    categories
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

  await createPost({
    title,
    description,
    body,
    imageUrl,
    createdBy: user.userName,
    userId: user.id,
    category: category,
    featured: featured || false
  })

  return redirect('/drafts')
}

export default function Uploader() {
  const actionData = useActionData<typeof action>()

  const navigation = useNavigation()
  const { categories } = useRouteLoaderData('root') as {
    categories: Category[]
  }
  const text =
    navigation.state === 'submitting'
      ? 'Saving...'
      : navigation.state === 'loading'
      ? 'Saved!'
      : 'Save'

  const fetcher = useFetcher<ActionData>()

  const [selected, setSelected] = useState<string>('')

  const onClick = async () =>
    fetcher.submit({
      imageUrl: 'imageUrl',
      key: 'imageUrl',
      action: '/actions/cloudinary'
    })

  return (
    <div className='mx-auto mb-7 flex w-[350px] flex-col items-center rounded-md bg-white p-2 text-slate12 dark:bg-crimson2 dark:text-slate1 md:w-[550px]'>
      <Form
        id='newPost'
        className='flex flex-col gap-5 rounded-xl bg-white text-slate12  dark:bg-crimson1 dark:text-black'
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
          className='rounded-md border text-sm text-slate12'
          name='title'
          defaultValue={actionData?.fields?.title}
          aria-invalid={Boolean(actionData?.fieldErrors?.title) || undefined}
          aria-errormessage={
            actionData?.fieldErrors?.title ? 'title-error' : undefined
          }
          onChange={(e) => console.log(e.target.value)}
        />
        {actionData?.fieldErrors?.title && (
          <p id='title-error' className='text-red-500'>
            {actionData?.fieldErrors?.title}
          </p>
        )}
        <label htmlFor='description'>Description</label>
        <input
          type='text'
          className='rounded-md border text-sm text-slate12'
          name='description'
          defaultValue={actionData?.fields?.description}
          aria-invalid={
            Boolean(actionData?.fieldErrors?.description) || undefined
          }
          aria-errormessage={
            actionData?.fieldErrors?.description
              ? 'description-error'
              : undefined
          }
          onChange={(e) => console.log(e.target.value)}
        />
        {actionData?.fieldErrors?.description && (
          <p id='description-error' role='alert' className='text-red-500'>
            {actionData?.fieldErrors?.description}
          </p>
        )}

        <div className='mb-5'>
          <label htmlFor='body'>Body</label>
          <TipTap />
        </div>
        <div className='flex flex-col gap-5 text-slate12 dark:text-black'>
          <label
            className='text-slate12 dark:text-black'
            htmlFor='categories'
          >
            Categories
          </label>

          <MultiSelect
            shadow='xl'
            data={categories}
            onChange={(e) => {
              setSelected(e.join(','))
            }}
          />
        </div>

        <div className='mb-5 mt-5 flex flex-col items-center gap-5 text-slate12 dark:text-black'>
          <label htmlFor='featured'>Featured</label>
          <Switch
            name='featured'
            onChange={(e) => console.log(e.target.value)}
            defaultChecked={false}
          />
        </div>

        <input type='hidden' name='categories' value={selected} />
      </Form>
      <div className='flex flex-row gap-2'>
        <fetcher.Form
          method='post'
          encType='multipart/form-data'
          action='/actions/cloudinary'
          onClick={onClick}
          className='mx-auto flex flex-col items-center gap-2'
        >
          <label htmlFor='imageUrl' className='subtitle'>
            Attach an Image
          </label>
          <input
            id='imageUrl'
            className='block w-full rounded-xl border-2 p-2 text-sm text-slate12 dark:text-black'
            type='file'
            name='imageUrl'
            accept='image/*'
          />
          <button className='btn-primary' type='submit'>
            Upload Image
          </button>
        </fetcher.Form>
        <div className='flex w-full flex-col items-center gap-5'>
          {fetcher.data ? (
            <div className='flex w-full flex-col items-center gap-2'>
              <p className='h6'>Image uploaded</p>
              <input
                type='hidden'
                name='imageUrl'
                value={fetcher?.data?.imageUrl}
              />
              <div className='flex'>
                <div className=' rounded-xl  text-slate12'>
                  <img
                    src={fetcher?.data?.imageUrl}
                    alt={'no'}
                    style={{
                      objectFit: 'cover'
                    }}
                  />
                </div>
              </div>
            </div>
          ) : null}

          <div className='flex flex-row items-center justify-center gap-2 text-slate12 dark:text-black'>
            <button type='submit' form='newPost' className='btn-primary'>
              {text}
            </button>
          </div>
        </div>
      </div>
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
