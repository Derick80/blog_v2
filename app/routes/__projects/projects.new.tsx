import type { ActionArgs } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { useRouteLoaderData, useFetcher, Form } from '@remix-run/react'
import type { Categories } from '~/utils/schemas/projects-schema'
import { isAuthenticated } from '~/utils/server/auth/auth.server'
import { prisma } from '~/utils/server/prisma.server'

export async function action({ request }: ActionArgs) {
  const user = await isAuthenticated(request)
  if (!user) {
    throw new Error('Not Authenticated')
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

  return redirect('/projects')
}

export default function Index() {
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
        action='/projects/new'
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
          className='w-full p-2 text-black shadow-md '
        />
        <label htmlFor='description' className='text-sm font-semibold'>
          Description
        </label>
        <textarea
          name='description'
          className='w-full p-2 text-black shadow-md '
        />
        <select
          multiple
          name='categories'
          id='categories'
          className='rounded-md border p-2 text-black shadow-sm'
        >
          {categories.map((category) => {
            return <option key={category.id}>{category.value}</option>
          })}
        </select>

        <label htmlFor='projectUrl' className='text-sm font-semibold'>
          Project Url
        </label>
        <input
          type='text'
          name='projectUrl'
          className='w-full p-2 text-black shadow-md '
        />
        <label htmlFor='githubUrl' className='text-sm font-semibold'>
          Github Url
        </label>
        <input
          type='text'
          name='githubUrl'
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
        name='_action'
        value='new'
        form='projectForm'
        className='rounded-md bg-blue-500 p-2 text-white shadow-md'
      >
        Update
      </button>
    </div>
  )
}
