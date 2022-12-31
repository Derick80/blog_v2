import { Category } from '@prisma/client'
import type { ActionArgs, LoaderArgs } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { Form, Link, useFetcher, useLoaderData } from '@remix-run/react'
import React, { useEffect, useState } from 'react'
import { Select } from '~/components/shared/box/select-box'
import FormField from '~/components/shared/form-field'
import { isAuthenticated } from '~/models/auth/auth.server'
import getAllCategories from '~/models/categories.server'
import { CategoryForm, createPost } from '~/models/post.server'

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
  console.log(Array.isArray(categories))

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
  const data = useLoaderData<typeof loader>()

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
    <div className='flex items-center justify-center '>
      <Form method='post' action='/blog/new' className='form-primary'>
        <label htmlFor='title'>Title</label>
        <input
          className='form-field-primary'
          type='text'
          name='title'
          id='title'
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <label htmlFor='description'>Description</label>
        <input
          type='text'
          name='description'
          id='description'
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
        <label htmlFor='body'>Post Content</label>
        <FormField
          name='body'
          type='textarea'
          value={formData.body}
          onChange={(e) => setFormData({ ...formData, body: e.target.value })}
        />

        <div className='flex flex-row items-center justify-center'>
          <input
            type='hidden'
            name='imageUrl'
            id='imageUrl'
            value={formData.imageUrl}
            onChange={(e) =>
              setFormData({ ...formData, imageUrl: e.target.value })
            }
          />

          <div className='flex w-96 flex-col bg-slate-100 pt-2 text-zinc-800 dark:bg-zinc-800 dark:text-slate-100'>
            <div className='flex w-full rounded-md bg-red-300'>
              {formData.categories.map((item) => (
                <div key={item} className='flex items-center'>
                  <p>{item}</p>
                  <button
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
                    X
                  </button>
                </div>
              ))}
            </div>
            <Select
              options={cata}
              multiple={true}
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
      </Form>
    </div>
  )
}
//    <ul className={`${styles.options} ${isOpen ? styles.show : ""}`}>
