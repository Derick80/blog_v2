import {
  Button,
  Center,
  Container,
  MultiSelect,
  Stack,
  TextInput
} from '@mantine/core'
import type { ActionFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Form, useFetcher, useRouteLoaderData } from '@remix-run/react'
import { useState } from 'react'
import TipTap from '~/components/shared/tip-tap'
import type { Category } from '~/utils/schemas/category-schema'
import { isAuthenticated } from '~/utils/server/auth/auth.server'
import { createPost } from '~/utils/server/post.server'

type ActionData = {
  imageUrl?: string
}

export const action: ActionFunction = async ({ request }) => {
  const user = await isAuthenticated(request)
  if (!user) {
    return json({ error: 'Not authenticated' }, { status: 401 })
  }

  const formData = await request.formData()

  const imageUrl = formData.get('imageUrl')
  const title = formData.get('title')
  const description = formData.get('description')
  const body = formData.get('body')
  const categories = formData.get('categories')

  if (
    typeof imageUrl !== 'string' ||
    typeof title !== 'string' ||
    typeof description !== 'string' ||
    typeof body !== 'string' ||
    typeof categories !== 'string'
  ) {
    return json({
      errorMsg: 'Something went wrong while uploading'
    })
  }
  const cats = categories?.split(',')
  const category = cats.map((cat) => {
    return {
      value: cat
    }
  })

  console.log(imageUrl, 'imageUrl')

  if (!imageUrl) {
    return json({
      errorMsg: 'Something went wrong while uploading'
    })
  }

  if (!title) {
    return json({
      errorMsg: 'Something went wrong while uploading'
    })
  }

  await createPost({
    title,
    description,
    body,
    imageUrl,
    createdBy: user.userName,
    userId: user.id,
    category: category
  })
  return redirect('/drafts')
}

export default function Uploader() {
  const { categories } = useRouteLoaderData('root') as {
    categories: Category[]
  }

  const fetcher = useFetcher<ActionData>()

  const [selected, setSelected] = useState<string>('')

  const onClick = async () =>
    fetcher.submit({
      imageUrl: 'imageUrl',
      key: 'imageUrl',
      action: '/actions/image'
    })

  return (
    <Center>
      <Stack className='w-[350px] '>
        <Form
          id='newPost'
          className='flex flex-col gap-5 rounded-xl shadow-md'
          method='post'
        >
          <input
            type='hidden'
            className='rounded-xl bg-crimson12 text-slate12'
            name='imageUrl'
            value={fetcher?.data?.imageUrl}
            onChange={(e) => console.log(e.target.value)}
          />

          <TextInput
            label='Title'
            name='title'
            onChange={(e) => console.log(e.target.value)}
          />

          <TextInput
            label='Description'
            name='description'
            onChange={(e) => console.log(e.target.value)}
          />

          <TipTap />
          <MultiSelect
            label='Categories'
            data={categories}
            onChange={(e) => {
              setSelected(e.join(','))
            }}
          />
          <input type='hidden' name='categories' value={selected} />
        </Form>
        <div className='flex flex-col gap-5'>
          <fetcher.Form
            method='post'
            encType='multipart/form-data'
            action='/actions/image'
            onClick={onClick}
            className='flex flex-col gap-5'
          >
            <label htmlFor='imageUrl'>Upload an Image</label>
            <input
              id='imageUrl'
              className='block rounded-xl bg-crimson12 text-slate12'
              type='file'
              name='imageUrl'
              accept='image/*'
            />
            <Button color={'blue'} variant='subtle' type='submit'>
              Upload Image
            </Button>
          </fetcher.Form>
          {fetcher.data ? (
            <div className='flex  flex-col items-center'>
              <p className='text-white'>File has been uploaded</p>
              <input
                type='hidden'
                name='imageUrl'
                value={fetcher?.data?.imageUrl}
              />
              <div className='h-[100px] w-[100px] rounded-xl bg-crimson12 text-slate12'>
                <img src={fetcher?.data?.imageUrl} alt={'#'} />
              </div>
            </div>
          ) : null}
        </div>
        <Button type='submit' form='newPost' color={'green'} variant='outline'>
          Save post
        </Button>
      </Stack>
    </Center>
  )
}
