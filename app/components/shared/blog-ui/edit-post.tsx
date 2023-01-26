import { Button, Center, Flex } from '@mantine/core'
import { useFetcher } from '@remix-run/react'
import { useEffect, useState } from 'react'
import { Select } from '~/components/shared/box/select-box'

import type {
  Post,
  PrismaPost,
  SerializedEditPost
} from '~/utils/schemas/post-schema'
import { Modal } from '../layout/modal'
import TipTap from '../tip-tap'
export type EditPostProps = {
  post: Post
}

export default function Edit({ post }: EditPostProps) {
  const { id, title, description, body, imageUrl, categories } = post
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
    <Center>
      <form
      method='post'
      action={`/blog/${id}/edit`}
      className='w-[350px]'
    >
      <label htmlFor='title'>Title</label>
      <input
        className='rounded-xl bg-crimson12 text-slate12'
        type='text'
        name='title'
        id='title'
        value={title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
      />
      <label htmlFor='description'>Description</label>
      <div>{description}</div>
      <input
        className='rounded-xl bg-crimson12 text-slate12'
        type='text'
        name='description'
        id='description'
        value={description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
      />

      <label htmlFor='body'>Content</label>

      <div className='flex flex-col items-center justify-center'>
        {post.body && <TipTap />}
        <input type='hidden' name='body' value={formData.body} />
      </div>



        <Flex justify={"center"} >
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
            onChange={(event) => handleSelects(event)}
          />
        </div>
        </Flex>
      <Button
        type='submit'
        name='_action'
        value='save'
      >
        Save
      </Button>
      {post.published ? (
        <Button
          type='submit'
          name='_action'
          value='unpublish'
        >
          Unpublish
        </Button>
      ) : (
        <Button
          type='submit'
          name='_action'
          value='publish'
        >
          Publish
        </Button>
      )}
      <Button
        type='submit'
        name='_action'
        value='delete'
      >
        Delete
      </Button>
    </form>
    </Center>
  )
}
