import { Category } from '@prisma/client'
import type { ActionArgs, LoaderArgs } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { Form, Link, useFetcher, useLoaderData } from '@remix-run/react'
import React, { useEffect, useState } from 'react'
import { Select } from '~/components/shared/box/select-box'
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
  const postImg = formData.get('postImg') as string
  const categories = formData.getAll('categories')
console.log(Array.isArray(categories));


  const correctedCategories = categories.map((item) => {
    return {value: item}
  }) as CategoryForm

  const data = {
    title,
    description,
    body,
    postImg,
     correctedCategories,
    userId: user.id,
    createdBy:user.userName
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

  // do not need this now, I think
  // if( fetcher.data && fetcher.data.data){
  //     console.log('fetcher', fetcher.data.data.categories)
  //     }

  // go from label and value to just a string array of the values
  const cata =
    fetcher.data && fetcher.data.data ? fetcher.data.data.categories : []

  // use for the select box
  // const [selected, setSelected] = useState<string[]>([])
  // console.log('selected', selected);

  // React.useEffect(() => {
  //   setFormData((form) => ({ ...form, categories: selected }))
  // }, [selected])
  //   form data for the post
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    body: '',
    postImg: '',
    categories: [] as string[],
  })

  function handleSelects(event: React.ChangeEvent<HTMLSelectElement>) {
    const { value } = event.target
    if (formData.categories.includes(value)) {
      setFormData((prev) => ({
        ...prev,
        categories: prev.categories.filter((item) => item !== value),
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        categories: [...prev.categories, value],
      }))
    }
  }

  return (
    <div className='flex items-center justify-center'>
      <Form method='post' action='/blog/new'>
        <label htmlFor='title'>Title</label>
        <input
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
        <label htmlFor='body'>Body</label>
        <textarea
          name='body'
          id='body'
          value={formData.body}
          onChange={(e) => setFormData({ ...formData, body: e.target.value })}
        />
        <label htmlFor='postImg'>Image</label>
        <input
          type='text'
          name='postImg'
          id='postImg'
          value={formData.postImg}
          onChange={(e) =>
            setFormData({ ...formData, postImg: e.target.value })
          }
        />

        <div className='flex w-64 flex-col bg-sky-50 text-zinc-900 dark:text-slate-100'>
          <div className='flex w-full bg-red-300'>
            {formData.categories.map((item) => (
              <div key={item} className='flex items-center'>
                <p>{item}</p>
                <button
                  type='button'
                  onClick={() => {
                    setFormData((prev) => ({
                      ...prev,
                      categories: prev.categories.filter((cat) => cat !== item)
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
            onChange={(event)=> handleSelects(event)}
          />
          <br />
        </div>

        <button type='submit'>Submit</button>
      </Form>
    </div>
  )
}
//    <ul className={`${styles.options} ${isOpen ? styles.show : ""}`}>
