import type { ActionArgs, LoaderArgs } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import {
  Form,
  isRouteErrorResponse,
  useCatch,
  useFetcher,
  useLoaderData,
  useParams,
  useRouteError,
  useRouteLoaderData
} from '@remix-run/react'
import Button from '~/components/shared/button'
import type { Categories } from '~/utils/schemas/projects-schema'
import { isAuthenticated } from '~/utils/server/auth/auth.server'
import { prisma } from '~/utils/server/prisma.server'
import { getProjectById } from '~/utils/server/project.server'
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

export async function action({ request, params }: ActionArgs) {
  const user = await isAuthenticated(request)
  if (!user) {
    throw new Error('Not Authenticated')
  }
  const { id } = params
  if (!id) {
    throw new Error('id is required')
  }
  const formData = await request.formData()
  const action = formData.get('_action')
  const title = formData.get('title')
  const description = formData.get('description')
  const projectUrl = formData.get('projectUrl')
  const githubUrl = formData.get('githubUrl')
  const categories = formData.get('categories')
  const imageUrl = formData.get('imageUrl')

  if (
    typeof title !== 'string' ||
    typeof description !== 'string' ||
    typeof projectUrl !== 'string' ||
    typeof githubUrl !== 'string' ||
    typeof categories !== 'string' ||
    typeof imageUrl !== 'string'
  ) {
    return json({ error: 'Invalid form data' }, { status: 400 })
  }

  const cats = categories.split(',')
  console.log(imageUrl, 'imageUrl')

  switch (action) {
    case 'update':
      await prisma.project.update({
        where: {
          id: id
        },
        data: {
          title: title,
          description: description,
          projectUrl: projectUrl,
          githubUrl: githubUrl,
          categories: {
            connectOrCreate: {
              where: {
                value: categories
              },
              create: {
                value: categories,
                label: categories
              }
            }
          },
          projectImg: imageUrl
        }
      })
    case 'new':
      await prisma.project.create({
        data: {
          title: title,
          description: description,
          projectUrl: projectUrl,
          githubUrl: githubUrl,
          user: {
            connect: {
              id: user.id
            }
          },
          categories: {
            connectOrCreate: {
              where: {
                value: categories
              },
              create: {
                value: categories,
                label: categories
              }
            }
          },
          projectImg: imageUrl
        }
      })
  }

  return redirect(`/projects`)
}
export default function Index() {
  const data = useLoaderData<typeof loader>()
  const { categories } = useRouteLoaderData('root') as Categories
  const imageFetcher = useFetcher<ActionData>()
  const onClick = async () =>
    imageFetcher.submit({
      imageUrl: 'imageUrl',
      key: 'imageUrl',
      action: '/actions/cloudinary'
    })

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
          value={imageFetcher?.data?.imageUrl}
          onChange={(e) => console.log(e.target.value)}
        />
        <label htmlFor='title' className='text-sm font-semibold'>
          Title
        </label>
        <input
          type='text'
          name='title'
          defaultValue={data.project.title}
          className='w-full p-2 text-slate12 shadow-md '
        />
        <label htmlFor='description' className='text-sm font-semibold'>
          Description
        </label>
        <textarea
          name='description'
          defaultValue={data.project.description}
          className='w-full p-2 text-slate12 shadow-md '
        />
        {data.project.categories && (
          <select
            multiple
            name='categories'
            id='categories'
            className='rounded-md border p-2 text-slate12 shadow-sm'
          >
            {categories.map((category) => {
              return (
                <option
                  key={category.id}
                  selected={data.project.categories?.some(
                    (cat) => cat.value === category.value
                  )}
                >
                  {category.value}
                </option>
              )
            })}
          </select>
        )}

        <label htmlFor='projectUrl' className='text-sm font-semibold'>
          Project Url
        </label>
        <input
          type='text'
          name='projectUrl'
          defaultValue={data.project.projectUrl}
          className='w-full p-2 text-slate12 shadow-md '
        />
        <label htmlFor='githubUrl' className='text-sm font-semibold'>
          Github Url
        </label>
        <input
          type='text'
          name='githubUrl'
          defaultValue={data.project.githubUrl}
          className='w-full p-2 text-slate12 shadow-md '
        />
      </Form>

      <div className='flex flex-col gap-2'>
        <imageFetcher.Form
          method='post'
          encType='multipart/form-data'
          action='/actions/cloudinary'
          onClick={onClick}
          className='flex flex-col gap-2'
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
            <div className='h-[100px] w-[100px] rounded-xl  text-slate12'>
              <img src={imageFetcher?.data?.imageUrl} alt={'#'} />
            </div>
          </div>
        ) : null}
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
      <h1 className='text-2xl font-bold'>'something went wront'</h1>
      <pre>{errorMessage}</pre>
    </div>
  )
}
