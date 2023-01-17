import { EyeOpenIcon, Cross2Icon } from '@radix-ui/react-icons'
import { LoaderArgs, json, ActionArgs, redirect } from '@remix-run/node'
import { Outlet, useFetcher, useLoaderData } from '@remix-run/react'
import { useEffect, useState } from 'react'
import invariant from 'tiny-invariant'
import { Select } from '~/components/shared/box/select-box'
import CategoryContainer from '~/components/shared/category-container'
import TipTap from '~/components/shared/tip-tap'
import { isAuthenticated } from '~/utils/server/auth/auth.server'
import getAllCategories from '~/utils/server/categories.server'
import { CategoryForm, createPost } from '~/utils/server/post.server'
import { getMyPostsByEmail } from '~/utils/server/user.server'
export async function loader({ request }: LoaderArgs) {
  const user = await isAuthenticated(request)
  const categories = await getAllCategories()

  return json({ user, categories })
}
// Path: app/routes/omega/index.tsx

// Compare this snippet from app/routes/testing/index.tsx:

export async function action({ request }: ActionArgs) {
  const user = await isAuthenticated(request)
  if (!user) {
    return { redirect: '/auth/login' }
  }
  const formData = await request.formData()
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const body = formData.get('body') as string
  const imageUrl = formData.get('imageUrl')
  invariant(imageUrl, 'Image url is required')
  const categories = formData.getAll('categories')

  const correctedCategories = categories.map((item) => {
    return { value: item }
  }) as CategoryForm

  const data = {
    title,
    description,
    body,
    imageUrl,
    correctedCategories,
    userId: user.id,
    createdBy: user.userName
  }

  const post = await createPost(data)

  return post
}

export default function Index() {
  const data = useLoaderData<typeof loader>()

  const fetcher = useFetcher()

  const [isOpen, setIsOpen] = useState(false)
  //   form data for the post
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    body: '',
    imageUrl: '',
    categories: [] as string[]
  })

  useEffect(() => {
    if (fetcher.state === 'idle' && !fetcher.data) {
      fetcher.load('/postTags')
    }
  }, [fetcher])

  const cata =
    fetcher.data && fetcher.data.data ? fetcher.data.data.categories : []

  const options = cata.map((item) => {
    return item.value
  })

  function handleSelects(event: React.ChangeEvent<HTMLSelectElement>) {
    const { value } = event.target
    if (formData.categories.includes(value)) {
      setFormData((prev) => ({
        ...prev,
        categories: prev.categories.filter((item) => item !== value)
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        categories: [...prev.categories, value]
      }))
    }
  }

  return (
    <>
      <div className='grid-cols-6 gap-5 bg-crimson3 p-5 md:grid '>
        <div className='col-span-1 col-start-5 mx-auto flex flex-row justify-center'>
          <button
            className='border-transparent inline-flex items-center space-x-1.5 rounded border bg-crimson6 p-2 px-3 py-2 text-sm font-medium leading-4 shadow-sm'
            type='button'
            onClick={() => setIsOpen(!isOpen)}
          >
            <EyeOpenIcon />
          </button>
        </div>
        <fetcher.Form
          name='forma'
          method='post'
          action='/actions/image'
          encType='multipart/form-data'
          className='col-span-2 col-start-3 flex flex-col rounded-xl shadow-md'
          id='form'
        >
          <label htmlFor='imageUrl'>Image to upload</label>
          <input
            id='imageUrl'
            className='rounded-xl bg-crimson12 text-slate12'
            type='file'
            name='imageUrl'
            accept='image/*'
          />
          <button
            className='border-transparent inline-flex items-center space-x-1.5 rounded border bg-crimson6 p-2 px-3 py-2 text-sm font-medium leading-4 shadow-sm'
            type='submit'
          >
            Upload
          </button>
        </fetcher.Form>

        <form
          name='forma'
          method='post'
          className='col-span-2 col-start-3 flex flex-col rounded-xl shadow-md'
          id='form'
        >
          {fetcher?.data?.imageUrl ? (
            <>
              File has been uploaded
              <input
                type='hidden'
                name='imageUrl'
                value={fetcher.data.imageUrl}
                onChange={(e) =>
                  setFormData({ ...formData, imageUrl: e.target.value })
                }
              />
              {fetcher.data?.imageUrl ? (
                <img src={fetcher.data.imageUrl} alt={'#'} />
              ) : null}
            </>
          ) : null}

          <label htmlFor='title'>Title</label>
          <input
            className='rounded-xl bg-crimson12 text-slate12'
            type='text'
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
            className='rounded-xl bg-crimson12 text-slate12'
            name='description'
            id='description'
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />

          <div>
            <label htmlFor='body'>Post Content</label>
            <TipTap name={'body'} />
            <input type='hidden' name='body' value={formData.body} />
          </div>
          <div className='flex flex-col bg-crimson3 pt-5'>
            <div className='bg-red-300 flex w-full flex-wrap rounded-md'>
              {formData.categories.map((item, index) => (
                <CategoryContainer key={index} category={item} />
              ))}
            </div>
            <div className='bg-crimson3'>
              <Select
                options={cata}
                multiple={true}
                className='text-bg-crimson12 mt-4 bg-crimson3 pt-5'
                label='Categories'
                name='categories'
                value={formData.categories}
                onChange={(event) => handleSelects(event)}
              />
            </div>
            <br />
          </div>

          <button type='submit' className='btn-base btn-solid-success'>
            Save
          </button>
        </form>
        {isOpen && (
          <div className='col-span-1 col-start-6'>
            <h1 className='text-3xl'>Preview</h1>
          </div>
        )}
      </div>
    </>
  )
}
