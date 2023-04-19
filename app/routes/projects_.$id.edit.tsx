import { MultiSelect } from '@mantine/core'
import type { ActionArgs, LoaderArgs } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import {
  Form,
  isRouteErrorResponse,
  useActionData,
  useCatch,
  useFetcher,
  useLoaderData,
  useParams,
  useRouteError,
  useRouteLoaderData
} from '@remix-run/react'
import React from 'react'
import { z } from 'zod'
import Button from '~/components/shared/button'
import ImageUploader from '~/components/shared/image-fetcher'
import { Category } from '~/utils/schemas/category-schema'
import type { Categories } from '~/utils/schemas/projects-schema'
import { isAuthenticated } from '~/utils/server/auth/auth.server'
import { prisma } from '~/utils/server/prisma.server'
import { getProjectById } from '~/utils/server/project.server'
import { validateAction } from '~/utils/utilities'
type ActionData = {
  imageUrl?: string
}
export async function loader({ request, params }: LoaderArgs) {
  const user = await isAuthenticated(request)
  if (!user) {
    throw new Error('Not Authenticated')
  }

  const { id } = params
  if (!id) {
    throw new Error('id is required')
  }

  const project = await getProjectById(id)

  if (!project) {
    throw new Error('Project not found')
  }

  return json({ project })
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

export async function action({ request, params }: ActionArgs) {
  const user = await isAuthenticated(request)
  if (!user) {
    throw new Error('Not Authenticated')
  }
  const { id } = params
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

  const project = await prisma.project.update({
    where: {
      id: id as string
    },
    data: {
      title,
      description,
      projectUrl,
      githubUrl,
      projectImg: imageUrl,
      categories: {
        set: category.map((category) => ({
          value: category.value
        }))
      }
    }
  })

  return redirect(`/projects`)
}
export default function Index() {
  const data = useLoaderData<typeof loader>()
  const { categories } = useRouteLoaderData('root') as {
    categories: Category[]
  }
  const [url, setUrl] = React.useState('')
  const [selected, setSelected] = React.useState<string[]>(
    data.project.categories.map((cat) => cat.value)
  )

  const primaryCategories = categories.map((cat) => cat.value)
  const actionData = useActionData<{ errors: Record<string, string> }>()

  return (
    <div className='flex h-full w-full flex-col items-center'>
      <Form
        method='post'
        id='projectForm'
        className='flex w-1/2 flex-col gap-2'
      >
        <input
          type='hidden'
          name='imageUrl'
          value={url || data.project.projectImg}
          onChange={(e) => console.log(e.target.value)}
        />
        <label htmlFor='title' className='text-sm font-semibold'>
          Title
        </label>
        <input
          type='text'
          name='title'
          className='w-full p-2 text-slate12 shadow-md '
          defaultValue={actionData?.errors?.title || data.project.title}
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
          defaultValue={
            actionData?.errors?.description || data.project.description
          }
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

        <MultiSelect
          shadow='xl'
          name='categories'
          id='categories'
          data={primaryCategories}
          defaultValue={selected}
        />

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
          defaultValue={
            actionData?.errors?.projectUrl || data.project.projectUrl
          }
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
          defaultValue={actionData?.errors?.githubUrl || data.project.githubUrl}
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
        variant='primary_filled'
        size='small'
        type='submit'
        name='_action'
        value='update'
        form='projectForm'
      >
        Update
      </Button>
    </div>
  )
}

export function ErrorBoundary() {
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1 className='text-2xl font-bold'>'something went wront'</h1>
        <p className='text-xl font-semibold'>status{error.status}</p>
        <p className='text-xl font-semibold'>message{error.data.message}</p>
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
