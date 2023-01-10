import { FileInput, MultiSelect, TextInput } from '@mantine/core'
import type { Category } from '@prisma/client'
import { Cross2Icon, EyeOpenIcon } from '@radix-ui/react-icons'
import type { ActionArgs, LoaderArgs } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { useFetcher, useLoaderData } from '@remix-run/react'
import { IconUpload } from '@tabler/icons'
import React, { useEffect, useRef, useState } from 'react'
import { Select } from '~/components/shared/box/select-box'
import TipTap from '~/components/shared/tip-tap'
import { UploadMe } from '~/components/shared/upload'
import { isAuthenticated } from '~/models/auth/auth.server'
import getAllCategories from '~/models/categories.server'
import type { CategoryForm } from '~/models/post.server'
import { createPost } from '~/models/post.server'

export type CatFetcher = {
  categories: Pick<Category, 'value' | 'label'>[]
}
export async function loader({ request }: LoaderArgs) {
  const user = await isAuthenticated(request)
  if (!user) {
    return { redirect: '/auth/login' }
  }
  const categories = await getAllCategories()
console.log(categories, 'categories');

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
  const imageUrl = formData.get('imageUrl')
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

  //
  return redirect('/blog')
}

export default function NewPost() {
  const data = useLoaderData<typeof loader>()
  const ref = useRef<HTMLInputElement>(null);

  const [value, setValue] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  //   fetcher works! Grab all the categories from the database and display them in the select box. Use fetcher to ping the database and grab the categories.
  const fetcher = useFetcher()
  useEffect(() => {
    if (fetcher.state === 'idle' && !fetcher.data) {
      fetcher.load('/postTags')
    }
  }, [fetcher])

  const fileInputRef = useRef<HTMLInputElement | null>(null)

  //   grab the categories from the fetcher
  const cata =
    fetcher.data && fetcher.data.data ? fetcher.data.data.categories : []

  //   form data for the post
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    body: '',
    imageUrl: '',
    categories: []
    })
    const handleFileUpload = async (file: File) => {
      const inputFormData = new FormData()
      inputFormData.append('imageUrl', file)
      const response = await fetch('/actions/image', {
        method: 'POST',
        body: inputFormData
      })

      const { imageUrl } = await response.json()

      setFormData({
        ...formData,
        imageUrl: imageUrl
      })
    }






  return (
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
        method='post'
        action='/actions/image'
        encType='multipart/form-data'
        onChange={(event) => {
          onChange(event)
          fetcher.submit(event.currentTarget, { replace: true })
        }}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className='btn-primary btn-sold'>
          Update Photo
          <input
            type='file'
            name='imageUrl'
            id='imageUrl'
            accept='image/*'
            ref={fileInputRef}
            className='hidden'
          />
        </div>
      </fetcher.Form>

      <form
        name='forma'
        method='post'
        className='col-span-2 col-start-3 flex flex-col rounded-xl shadow-md'
        id='form'
      >
        {fetcher.data ? (
          <>

            {fetcher?.data?.imageUrl}
            <input
              type='text'
              name='imageUrl'
              value={fetcher.data.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              />
            <img src={fetcher.data.imageUrl} alt={'#'} />
          </>
        ) : null}

<TextInput
      placeholder="Your name"
      label="Title"
      description="Please enter a title for your post"
      radius="md"
      withAsterisk
      value={formData.title}
      onChange={(e) => setFormData({ ...formData, title: e.target.value })}

    />

        <TextInput
      placeholder="Your name"
      label="Description"
      description="Please enter a short descriptive summary"
      radius="md"
      withAsterisk
      value={formData.title}
      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
    />


        <div>
          <label htmlFor='body'>Post Content</label>
          <TipTap name={'body'} />
          <input type='hidden' name='body' value={formData.body} />
        </div>
        <div className='flex flex-col bg-crimson3 pt-5'>
          <div className='bg-red-300 flex w-full flex-wrap rounded-md'>
            {formData.categories.map((item) => (
              <div
                key={item}
                className='border-bg-crimson4 inline-flex w-fit items-center space-x-2 space-y-2 rounded-xl bg-crimson5 hover:bg-crimson4'
              >
                <p className='rounded-xl bg-crimson5 p-2 text-sm'>{item}</p>
                <button
                  className='border-transparent inline-flex items-center space-x-1.5 rounded-xl  bg-crimson5 p-2 px-3 py-2 text-sm font-medium leading-4 shadow-sm'
                  type='button'
                  onClick={() => {
                    setFormData((prev) => ({
                      ...prev,
                      categories: prev.categories.filter((cat) => cat !== item)
                    }))
                  }}
                >
                  <Cross2Icon />
                </button>
              </div>
            ))}
          </div>
          <div className='bg-crimson3'>
            <MultiSelect
            ref={ref}
            name='categories'
              data={data.categories}
              label='Categories'
              value={formData.categories}
              onChange={(e) => {
                setFormData({ ...formData, categories: e })

              }
              }
              nothingFound='No categories found'
              clearable
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
  )
}
//    <ul className={`${styles.options} ${isOpen ? styles.show : ""}`}>
