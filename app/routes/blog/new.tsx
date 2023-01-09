import type { Category } from '@prisma/client'
import { Cross2Icon, EyeOpenIcon } from '@radix-ui/react-icons'
import type { ActionArgs, LoaderArgs } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { useFetcher } from '@remix-run/react'
import React, { useEffect, useState } from 'react'
import { Select } from '~/components/shared/box/select-box'
import { ImageUploader } from '~/components/shared/image-uploader'
import TipTap from '~/components/shared/tip-tap'
import { isAuthenticated } from '~/models/auth/auth.server'
import getAllCategories from '~/models/categories.server'
import type { CategoryForm } from '~/models/post.server'
import { createPost } from '~/models/post.server'
import Uploader from '../beta'

export type CatFetcher = {
  categories: Pick<Category, 'value' | 'label'>[]
}
export async function loader({ request }: LoaderArgs) {
  const user = await isAuthenticated(request)
  if (!user) {
    return { redirect: '/auth/login' }
  }
  const categories = await getAllCategories()

  return json({ user, categories })
}

export async function action({ request }: ActionArgs) {
  const user = await isAuthenticated(request)
  if (!user) {
    return { redirect: '/auth/login' }
  }
  const formData = await request.formData()
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const body = formData.get('body') as string
  const imageUrl = formData.get('imageUrl') as string
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
  console.log('data', categories)

  await createPost(data)
  //
  return redirect('/blog')
}

export default function NewPost() {
const fomer = useFetcher()
  const [isOpen, setIsOpen] = useState(false)
  //   fetcher works! Grab all the categories from the database and display them in the select box. Use fetcher to ping the database and grab the categories.
  const fetcher = useFetcher()
  useEffect(() => {
    if (fetcher.state === 'idle' && !fetcher.data) {
      fetcher.load('/postTags')
    }
  }, [fetcher])

  //   grab the categories from the fetcher
  const cata =
    fetcher.data && fetcher.data.data ? fetcher.data.data.categories : []



  //   form data for the post
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    body: '',
    imageUrl: '',
    categories: [] as string[]
  })

  const handleFileUpload = async (file: File) => {
    const inputFormData = new FormData()
    inputFormData.append('imageUrl', file)
    const response = await fetch('/actions/image', {
      method: 'POST',
      body: inputFormData
    })

    const { imageUrl } = await response.json()
    console.log('imageUrl', imageUrl)

    setFormData({
      ...formData,
      imageUrl: imageUrl
    })
  }

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
    <div className='md:grid p-5 grid-cols-6 gap-5 bg-crimson3 '>
        <div
          className='col-span-1 col-start-5 flex justify-center flex-row mx-auto'
        >
        <button
          className='border-transparent inline-flex items-center space-x-1.5 rounded border bg-crimson6 p-2 px-3 py-2 text-sm font-medium leading-4 shadow-sm'
          type='button'
          onClick={() => setIsOpen(!isOpen)}
        >
          <EyeOpenIcon />
          </button>
        </div>

      <fomer.Form

      name='forma'
      method='post' action='/blog/new' className='col-span-2 col-start-3 flex flex-col rounded-xl shadow-md'
      id='form'

      >
      <input
            type='hidden'
            name='imageUrl'
            id='imageUrl'
            value={formData.imageUrl}
            onChange={(e) =>
              setFormData({ ...formData, imageUrl: e.target.value })
            }
          />

        <label htmlFor='title'>Title</label>
        <input
          className='text-slate12 rounded-xl bg-crimson12'
          type='text'
          name='title'
          id='title'
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <label htmlFor='description'>Description</label>
        <input
          type='text'
          className='text-slate12 rounded-xl bg-crimson12'

          name='description'
          id='description'
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />

     <div>
     <label htmlFor='body'>Post Content</label>
        <TipTap name={ 'body' }

        />
  <input type='hidden' name='body' value={formData.body} />
     </div>
       <div className='pt-5 flex flex-col bg-crimson3'>
            <div className='bg-red-300 flex w-full flex-wrap rounded-md'>
              {formData.categories.map((item) => (
                <div key={item} className='inline-flex items-center rounded-xl bg-crimson5 w-fit space-x-2 space-y-2 hover:bg-crimson4 border-bg-crimson4'>
                  <p className='bg-crimson5 text-sm p-2 rounded-xl'>{item}</p>
                  <button
                   className='border-transparent inline-flex items-center space-x-1.5 rounded-xl  bg-crimson5 p-2 px-3 py-2 text-sm font-medium leading-4 shadow-sm'
                    type='button'
                    onClick={() => {
                      setFormData((prev) => ({
                        ...prev,
                        categories: prev.categories.filter(
                          (cat) => cat !== item
                        )
                      }))
                    }}
                  >
                  <Cross2Icon />
                  </button>
                </div>
              ))}
            </div>
            <div className='bg-crimson3'>
            <Select
              options={cata}
              multiple={true}
              className='bg-crimson3 pt-5 mt-4 text-bg-crimson12'
              label='Categories'
              name='categories'
              value={formData.categories}
              onChange={(event) => handleSelects(event)}
            />
          </div>
          <br />
        </div>

       <Uploader />

        <button type='submit'

        className='btn-base btn-solid-success'>
          Save
        </button>
      </fomer.Form>
     {isOpen &&  <div className='col-span-1 col-start-6'>
        <h1 className='text-3xl'>Preview</h1>
        </div>}
    </div>
  )
}
//    <ul className={`${styles.options} ${isOpen ? styles.show : ""}`}>
