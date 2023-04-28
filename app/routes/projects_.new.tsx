import { MultiSelect } from '@mantine/core'
import type { ActionArgs } from '@remix-run/node'
import { json, redirect, } from '@remix-run/node'
import {
  useRouteLoaderData,
  Form,
  isRouteErrorResponse,
  useRouteError,
  useActionData,
  useFetcher,
} from '@remix-run/react'
import React from 'react'
import { z } from 'zod'
import Button from '~/components/shared/button'
import ImageUploader from '~/components/shared/image-fetcher'
import type { Category } from '~/utils/schemas/category-schema'
import { isAuthenticated } from '~/utils/server/auth/auth.server'
import { prisma } from '~/utils/server/prisma.server'
import { validateAction } from '~/utils/utilities'

export function meta() {
  return [
    {
      title: 'Create a new project'
    },
    {
      name: 'description',
      content: 'Create a new project'
    },
    {
      property: 'og:title',
      content: 'Create a new project'
    },
    {
      property: 'og:description',
      content: 'Create a new project'
    }
  ]
}

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  projectUrl: z.string().url('Project URL is not valid'),
  githubUrl: z.string().url('Github URL is not valid'),
  categories: z.string().min(1, 'Categories is required'),
  imageUrl: z.string().min(1, 'Image is required')
})

export type ActionInput = z.infer<typeof schema>
export async function action({ request }: ActionArgs) {
  const user = await isAuthenticated(request)
  if (!user) {
    throw new Error('Not Authenticated')
  }

  const { formData, errors } = await validateAction({ request, schema })

  if (errors) {
    return json({ errors }, { status: 400 })
  }

  const { title, description, projectUrl, githubUrl, categories, imageUrl } =
    formData as ActionInput

  const cats = categories?.split(',')
  const category = cats.map((cat) => {
    return {
      value: cat
    }
  })

  await prisma.project.create({
    data: {
      title: title,
      description: description,
      projectUrl: projectUrl,
      githubUrl: githubUrl,
      projectImg: imageUrl,
      user: {
        connect: {
          id: user.id
        }
      },
      categories: {
        connectOrCreate: category.map((cata: { value: string }) => ({
          where: {
            value: cata.value
          },
          create: {
            value: cata.value,
            label: cata.value
          }
        }))
      }
    }
  })

  return redirect('/projects')
}

export default function Index() {

  const [url, setUrl] = React.useState('')
  const [selected, setSelected] = React.useState('')
  const actionData = useActionData<{ errors: Record<string, string> }>()
  const categoryFetcher = useFetcher()

React.useEffect(()=>
{
  if(categoryFetcher.state === 'idle' && !categoryFetcher.data)
  categoryFetcher.load(`/categories/new`)
},[categoryFetcher])


  const categories = categoryFetcher?.data?.categories as Category[]
  return (
    <div className='flex h-full w-full flex-col items-center'>
      <Form
        action='/projects/new'
        method='post'
        id='projectForm'
        className='flex w-1/2 flex-col gap-2'
      >
        <input
          type='hidden'
          name='imageUrl'
          value={url}
          onChange={(e) => console.log(e.target.value)}
        />
        <label htmlFor='title' className='text-sm font-semibold'>
          Title
        </label>
        <input
          type='text'
          name='title'
          className='w-full p-2 text-slate12 shadow-md '
          defaultValue={actionData?.errors?.title}
          aria-invalid={Boolean(actionData?.errors?.title) || undefined}
          aria-errormessage={
            actionData?.errors?.title ? 'title-error' : undefined
          }
        />
        {actionData?.errors?.title && (
          <p id='title-error' className='text-red-500'>
            {actionData?.errors?.title}
          </p>
        )}
        <label htmlFor='description' className='text-sm font-semibold'>
          Description
        </label>
        <textarea
          name='description'
          className='w-full p-2 text-slate12 shadow-md '
          defaultValue={actionData?.errors?.description}
          aria-invalid={Boolean(actionData?.errors?.description) || undefined}
          aria-errormessage={
            actionData?.errors?.description ? 'description-error' : undefined
          }
        />
        {actionData?.errors?.description && (
          <p id='description-error' role='alert' className='text-red-500'>
            {actionData?.errors?.description}
          </p>
        )}
        <label className='text-slate12' htmlFor='categories'>
          Categories
        </label>

        { categoryFetcher?.data && <MultiSelect
            shadow='xl'
            data={categoryFetcher?.data?.categories.map((cat) => ({
              label: cat.value,
              value: cat.value
              }))}
            onChange={(e) => {
              setSelected(e.join(','))
            }}
          />

            }
        {actionData?.errors?.categories && (
          <p id='categories-error' role='alert' className='text-red-500'>
            {actionData?.errors?.categories}
          </p>
        )}
        <label htmlFor='projectUrl' className='text-sm font-semibold'>
          Project Url
        </label>
        <input
          type='text'
          name='projectUrl'
          className='w-full p-2 text-slate12 shadow-md '
          defaultValue={actionData?.errors?.projectUrl}
          aria-invalid={Boolean(actionData?.errors?.projectUrl) || undefined}
          aria-errormessage={
            actionData?.errors?.projectUrl ? 'projectUrl-error' : undefined
          }
        />
        {actionData?.errors?.projectUrl && (
          <p id='projectUrl-error' role='alert' className='text-red-500'>
            {actionData?.errors?.projectUrl}
          </p>
        )}

        <label htmlFor='githubUrl' className='text-sm font-semibold'>
          Github Url
        </label>
        <input
          type='text'
          name='githubUrl'
          className='w-full p-2 text-slate12 shadow-md '
          defaultValue={actionData?.errors?.githubUrl}
          aria-invalid={Boolean(actionData?.errors?.githubUrl) || undefined}
          aria-errormessage={
            actionData?.errors?.githubUrl ? 'githubUrl-error' : undefined
          }
        />
        {actionData?.errors?.githubUrl && (
          <p id='githubUrl-error' role='alert' className='text-red-500'>
            {actionData?.errors?.githubUrl}
          </p>
        )}
        <input type='hidden' name='categories' value={selected} />
      </Form>

      <div className='flex flex-col gap-2'>
        <ImageUploader setUrl={setUrl} />
        {actionData?.errors?.imageUrl && (
          <p id='imageUrl-error' role='alert' className='text-red-500'>
            {actionData?.errors?.imageUrl}
          </p>
        )}
      </div>
      <Button
        type='submit'
        name='_action'
        value='new'
        form='projectForm'
        variant='primary_filled'
        size='base'
        className='rounded-md bg-blue-500 p-2 text-white shadow-md'
      >
        Save
      </Button>
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
