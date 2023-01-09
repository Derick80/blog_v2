import { useFetcher } from '@remix-run/react'
import { useEffect, useState } from 'react'
import { Select } from '~/components/shared/box/select-box'

import type {
  PrismaPost,
  SerializedEditPost
} from '~/utils/schemas/post-schema'
import TipTap from '../tip-tap'
export type EditPostProps = {
  post: SerializedEditPost
}

export default function Edit({ post }: EditPostProps) {
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
    title: post.title,
    description: post.description,
    body: post.body || '',
    imageUrl: post.imageUrl,
    categories: post.categories.map((item) => item.value)
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
    <div className='grid-cols-6 gap-5 bg-crimson3 p-5 md:grid '>
      <form
        method='post'
        action={`/blog/${post.id}/edit`}
        className='col-span-2 col-start-3 flex flex-col rounded-xl shadow-md'
      >
        <label htmlFor='title'>Title</label>
        <input
          className='rounded-xl bg-crimson12 text-slate12'
          type='text'
          name='title'
          id='title'
          value={post.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <label htmlFor='description'>Description</label>
        <div>{post.description}</div>
        <input
          className='rounded-xl bg-crimson12 text-slate12'
          type='text'
          name='description'
          id='description'
          value={post.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />

        <label htmlFor='body'>Post Content</label>

        <div className='flex flex-col items-center justify-center'>
          {post.body && <TipTap name={'body'} content={formData.body} />}
          <input type='hidden' name='body' value={formData.body} />
        </div>

        {/* <FormField
          name='body'
          type='textarea'
          value={formData.body}
          onChange={(e) => setFormData({ ...formData, body: e.target.value })}
        /> */}

        <div className='flex flex-row items-center justify-center'>
          <input
            type='hidden'
            name='imageUrl'
            id='imageUrl'
            value={post.imageUrl}
            onChange={(e) =>
              setFormData({ ...formData, imageUrl: e.target.value })
            }
          />

          <div className='bg-slate-100 text-zinc-800 dark:bg-zinc-800 dark:text-slate-100 flex w-96 flex-col pt-2'>
            <div className='bg-red-300 flex w-full rounded-md'>
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
        <ImageUploader
          onChange={handleFileUpload}
          imageUrl={formData.imageUrl}
        />
        <button
          type='submit'
          className='btn-base btn-solid-primary'
          name='_action'
          value='save'
        >
          Save
        </button>
        {post.published ? (
          <button
            type='submit'
            className='btn-base btn-solid-warn'
            name='_action'
            value='unpublish'
          >
            Unpublish
          </button>
        ) : (
          <button
            type='submit'
            className='btn-base btn-solid-warn'
            name='_action'
            value='publish'
          >
            Publish
          </button>
        )}
        <button
          type='submit'
          className='btn-base btn-solid-danger'
          name='_action'
          value='delete'
        >
          Delete
        </button>
      </form>
    </div>
  )
}
