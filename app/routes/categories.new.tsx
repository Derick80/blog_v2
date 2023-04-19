import { Cross2Icon } from '@radix-ui/react-icons'
import { ActionArgs, LoaderArgs, redirect } from '@remix-run/node'
import { json } from '@remix-run/node'
import {
  Form,
  Outlet,
  isRouteErrorResponse,
  useActionData,
  useLoaderData,
  useRouteError
} from '@remix-run/react'
import { z } from 'zod'
import Button from '~/components/shared/button'
import { isAuthenticated } from '~/utils/server/auth/auth.server'
import getAllCategories, {
  createCategory
} from '~/utils/server/categories.server'
import { validateAction } from '~/utils/utilities'

export function meta() {
  return [
    {
      name: 'description',
      content: 'Create a new category'
    },
    {
      name: 'og:title',
      content: 'Create a new category'
    },
    {
      name: 'twitter:title',
      content: 'Create a new category'
    },
    {
      name: 'og:description',
      content: 'Create a new category'
    },
    {
      name: 'twitter:description',
      content: 'Create a new category'
    }
  ]
}

export async function loader({ request }: LoaderArgs) {
  const categories = await getAllCategories()

  return json({ categories })
}

const schema = z.object({
  categoryName: z.string().min(1).max(50)
})

export type ActionInput = z.TypeOf<typeof schema>
export async function action({ request }: ActionArgs) {
  const user = await isAuthenticated(request)
  if (!user) {
    return (
      redirect('/login'),
      json({ message: 'not authenticated' }, { status: 401 })
    )
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

  const { categoryName } = formData as ActionInput
  await createCategory(categoryName)

  return json({
    success: true
  })
}

export default function CategoryIndex() {
  const data = useLoaderData<typeof loader>()
  const actionData = useActionData<{ errors?: { categoryName?: string } }>()

  return (
    <>
      <div className='itemss-center flex w-[350px] flex-col gap-2 p-2'>
        <h3 className='text-lg font-semibold uppercase'>Existing Categories</h3>
        <div className='flex flex-row flex-wrap justify-start gap-2'>
          {data.categories.map((category: { id: string; value: string }) => (
            <div
              key={category.id}
              className='flex flex-col justify-start gap-4 rounded-sm outline'
            >
              <div className='flex items-center'>
                <div className='m-0.5 flex-grow text-xs'>{category.value}</div>
                <Form
                  method='POST'
                  action={`/blog/categories/${category.id}/delete`}
                  className='inline-flex items-center border-l-2'
                >
                  <Button type='submit' variant='icon_unfilled' size='tiny'>
                    <Cross2Icon />
                  </Button>
                </Form>
              </div>
            </div>
          ))}
        </div>
        <h3 className='text-lg font-semibold uppercase'> New Category</h3>
        <Form className='itesms-center flex flex-col gap-1' method='POST'>
          <div className='flex flex-col gap-1'>
            <label
              className='text-sm font-bold text-slate12'
              htmlFor='categoryName'
            >
              Category Name
            </label>
            <input
              type='text'
              className='rounded-md border text-sm text-slate12'
              name='categoryName'
              id='categoryName'
              defaultValue={actionData?.errors?.categoryName}
              aria-invalid={
                Boolean(actionData?.errors?.categoryName) || undefined
              }
              aria-errormessage={
                actionData?.errors?.categoryName
                  ? 'categoryName-error'
                  : undefined
              }
            />
          </div>
          {actionData?.errors?.categoryName && (
            <p id='categoryName-error' className='text-red-500'>
              {actionData?.errors?.categoryName}
            </p>
          )}
          <Button
            variant='primary_filled'
            size='base'
            className=''
            type='submit'
          >
            Create
          </Button>
        </Form>
      </div>
    </>
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
