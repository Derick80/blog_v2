import {
  Center,
  Container,
  Grid,
  MultiSelect,
  Stack,
  TextInput
} from '@mantine/core'
import type { ActionFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useFetcher, useRouteLoaderData } from '@remix-run/react'
import { useState } from 'react'
import TipTap from '~/components/shared/tip-tap'
import { isAuthenticated } from '~/utils/server/auth/auth.server'
import { prisma } from '~/utils/server/prisma.server'
import { Categories } from '../postTags'

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

  if(typeof imageUrl !== 'string' ||
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

  await prisma.post.create({
    data: {
      imageUrl: imageUrl,
      title: title,
      userId: user.id,
      description,
      body,
      createdBy: user.userName,
      published: true,
      categories: {
        connectOrCreate: category.map((cat) => ({
          where: {
            value: cat.value
          },
          create: {
            label: cat.value,
            value: cat.value
          }
        }))
      }
    }
  })

  return json({
    imageUrl
  })
}

export default function Uploader() {
  const { categories } = useRouteLoaderData('root') as {
    categories: Categories
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
      <Stack className='w-[350px]'>
        <form
          className='col-span-2 col-start-3 flex flex-col rounded-xl shadow-md'
          method='post'
        >
          <label htmlFor='imageUrl'>Image</label>
          <input
            type='text'
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
              console.log(e.join(','))
            }}
          />
          <input type='hidden' name='categories' value={selected} />
          <button type='submit'>Save post</button>
        </form>
        <Container>
          <fetcher.Form
            method='post'
            encType='multipart/form-data'
            action='/actions/image'
            onClick={onClick}
            className='col-span-2 col-start-3 flex flex-col rounded-xl shadow-md'
          >
            <label htmlFor='imageUrl'>Image to upload</label>
            <input
              id='imageUrl'
              className='rounded-xl bg-crimson12 text-slate12'
              type='file'
              name='imageUrl'
              accept='image/*'
            />
            <button type='submit'>Upload</button>
          </fetcher.Form>
          {fetcher.data ? (
            <>
              <div>
                File has been uploaded to S3 and is available under the
                following URL:
              </div>
              <input
                type='hidden'
                name='imageUrl'
                value={fetcher.data.imageUrl}
              />
              {fetcher?.data?.imageUrl}

              <img src={fetcher.data.imageUrl} alt={'#'} />
            </>
          ) : null}
        </Container>
      </Stack>
    </Center>
  )
}
