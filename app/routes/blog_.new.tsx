import { MultiSelect, Switch } from '@mantine/core'
import type { ActionArgs, LoaderArgs } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { json } from '@remix-run/node'
import {
  Form,
  isRouteErrorResponse,
  useActionData,
  useNavigation,
  useRouteError,
  useRouteLoaderData
} from '@remix-run/react'
import { z } from 'zod'
import { useState } from 'react'
import TipTap from '~/components/shared/tip-tap'
import type { Category } from '~/utils/schemas/category-schema'
import { isAuthenticated } from '~/utils/server/auth/auth.server'
import { createPost } from '~/utils/server/post.server'
// or cloudflare/deno
import ImageUploader from '~/components/shared/image-fetcher'
import React from 'react'
import { validateAction } from '~/utils/utilities'

export async function loader({ request }: LoaderArgs) {
  const user = await isAuthenticated(request)

  if (!user) {
    throw new Response(
      'Not authenticated Please Login to create a new blog post',
      { status: 401 }
    )
  }
  return json({ user })
}
const schema = z.object({
  imageUrl: z.string().min(1, 'Image url is required'),
  title: z
    .string()
    .min(10, 'please enter a title with at leasat 10 characters'),
  description: z
    .string()
    .min(10, 'please enter a description longer than 10 characters'),
  body: z
    .string()
    .min(10, 'please enter a description longer than 10 characters'),
  featured: z.coerce.boolean(),
  categories: z.string()
})
export type ActionInput = z.TypeOf<typeof schema>

export async function action({ request }: ActionArgs) {
  const user = await isAuthenticated(request)
  if (!user) {
    return json({ errors: ['Not .', 'please login'] }, { status: 401 })
  }

  const { formData, errors } = await validateAction<ActionInput>({
    request,
    schema
  })

  if (errors) {
    return json(
      { errors },
      {
        status: 400
      }
    )
  }
  const { title, imageUrl, description, body, categories, featured } =
    formData as ActionInput

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
  const [url, setUrl] = React.useState('')

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

  const [selected, setSelected] = useState<string>('')

  return (
    <div className='mx-auto mb-7 flex flex-col items-center rounded-md p-6 text-slate12 '>
      <Form
        id='newPost'
        className='flex flex-col gap-5 rounded-xl  text-slate12  '
        method='post'
      >
        <input
          type='hidden'
          className='rounded-xl text-slate12'
          name='imageUrl'
          value={url}
          onChange={(e) => console.log(e.target.value)}
        />
        <label htmlFor='title'>Title</label>
        <input
          type='text'
          className='rounded-md border text-sm text-slate12'
          name='title'
          defaultValue={actionData?.errors?.title}
          aria-invalid={Boolean(actionData?.errors?.title) || undefined}
          aria-errormessage={
            actionData?.errors?.title ? 'title-error' : undefined
          }
          onChange={(e) => console.log(e.target.value)}
        />
        {actionData?.errors?.title && (
          <p id='title-error' className='text-red-500'>
            {actionData?.errors?.title}
          </p>
        )}
        <label htmlFor='description'>Description</label>
        <input
          type='text'
          className='rounded-md border text-sm text-slate12'
          name='description'
          defaultValue={actionData?.errors?.description}
          aria-invalid={Boolean(actionData?.errors?.description) || undefined}
          aria-errormessage={
            actionData?.errors?.description ? 'description-error' : undefined
          }
          onChange={(e) => console.log(e.target.value)}
        />
        {actionData?.errors?.description && (
          <p id='description-error' role='alert' className='text-red-500'>
            {actionData?.errors?.description}
          </p>
        )}

        <div className='mb-5'>
          <label htmlFor='body'>Body</label>
          <TipTap />
        </div>
        <div className='flex flex-col gap-5 text-slate12'>
          <label className='text-slate12' htmlFor='categories'>
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

        <div className='mb-5 mt-5 flex flex-col items-center gap-5 text-slate12'>
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
        <ImageUploader setUrl={setUrl} />
        <div className='flex w-full flex-col items-center gap-5'>
          <div className='flex flex-row items-center justify-center gap-2 text-slate12'>
            <button type='submit' form='newPost' className=''>
              {text}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
export function ErrorBoundary() {
  const error = useRouteError()
  if (isRouteErrorResponse(error)) {
    return (
      <div className='flex flex-col items-center justify-center gap-2 border-2 border-red-500 text-slate12'>
        <h1 className='text-2xl font-bold'>oops</h1>
        <h1 className='text-2xl font-bold'>Status:{error.status}</h1>
        <h2 className='text-xl font-semibold'>Error:{error.data}</h2>
        <p className='text-base font-semibold'>{error.data.message}</p>
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
