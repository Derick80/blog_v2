import { ActionArgs, json, LoaderArgs, redirect } from '@remix-run/node'
import {
  Form,
  useCatch,
  useFetcher,
  useLoaderData,
  useParams,
  useRouteLoaderData
} from '@remix-run/react'
import { Categories } from '~/utils/schemas/projects-schema'
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

  console.log(imageUrl, 'imageUrl')

  if (!imageUrl) {
    return json({
      errorMsg: 'Something went wrong while uploading'
    })
  }

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

  return redirect(`/projects`)
}
export default function Index() {
  const data = useLoaderData<typeof loader>()
  const { categories } = useRouteLoaderData('root') as Categories
  const imageFetcher = useFetcher()
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
        <input type='hidden' name='imageUrl' value={imageFetcher?.data?.imageUrl}
        onChange={(e) => console.log(e.target.value)}
        />
        <label htmlFor='title' className='text-sm font-semibold'>
          Title
        </label>
        <input
          type='text'
          name='title'
          defaultValue={data.project.title}
          className='w-full p-2 text-black shadow-md '
        />
        <label htmlFor='description' className='text-sm font-semibold'>
          Description
        </label>
        <textarea
          name='description'
          defaultValue={data.project.description}
          className='w-full p-2 text-black shadow-md '
        />
        {data.project.categories && (
          <select
            multiple
            name='categories'
            id='categories'
            className='rounded-md border p-2 text-black shadow-sm'
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
          className='w-full p-2 text-black shadow-md '
        />
        <label htmlFor='githubUrl' className='text-sm font-semibold'>
          Github Url
        </label>
        <input
          type='text'
          name='githubUrl'
          defaultValue={data.project.githubUrl}
          className='w-full p-2 text-black shadow-md '
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
            <div className='h-[100px] w-[100px] rounded-xl bg-crimson12 text-slate12'>
              <img src={imageFetcher?.data?.imageUrl} alt={'#'} />
            </div>
          </div>
        ) : null}
      </div>
      <button
        type='submit'
        form='projectForm'
        className='rounded-md bg-blue-500 p-2 text-white shadow-md'
      >
        Update
      </button>

      <details>
        <summary>Project</summary>
        <p>Project</p>
        <pre className='text-sm text-gray-500'>
          {JSON.stringify(data.project, null, 2)}
        </pre>
      </details>
    </div>
  )
}

export function CatchBoundry() {
  const caught = useCatch()
  const params = useParams()

  switch (caught.status) {
    case 404: {
      return <h2>Profile with ID "{params.id}" not found!</h2>
    }
    default: {
      // if we don't handle this then all bets are off. Just throw an error
      // and let the nearest ErrorBoundary handle this
      throw new Error(`${caught.status} not handled`)
    }
  }
}
export function ErrorBoundary({ error }: any) {
  return (
    <div>
      <h1 className='text-3xl font-bold'>Incomes root ERROR</h1>
      <p>{error.message}</p>
      <p>The stack trace is:</p>
      <pre>{error.stack}</pre>
    </div>
  )
}
