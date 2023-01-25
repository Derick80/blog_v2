import { Center, Container, Grid, MultiSelect, TextInput } from '@mantine/core'
import type { ActionFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import {
  useFetcher,
  useLoaderData,
  useMatches,
  useOutletContext,
  useRouteLoaderData
} from '@remix-run/react'
import { useEffect, useState } from 'react'
import { useRouteData } from 'remix-utils'
import TipTap from '~/components/shared/tip-tap'
import { isAuthenticated } from '~/utils/server/auth/auth.server'
import { CategoryForm } from '~/utils/server/post.server'
import { prisma } from '~/utils/server/prisma.server'
import { useMatchesData } from '~/utils/utilities'
import { loader } from '.'
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

  const imageUrl = formData.get('imageUrl') as string
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const body = formData.get('body') as string

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
      createdBy: user.userName
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

  console.log(categories, 'categories')

  const fetcher = useFetcher<ActionData>()

  const [selected, setSelected] = useState<string[]>([])

  const onClick = async () =>
    fetcher.submit({
      imageUrl: 'imageUrl',
      key: 'imageUrl',
      action: '/actions/image'
    })

  return (
    <div className='col-span-4 p-2 md:col-span-1 md:col-start-3 md:col-end-11'>
      <Grid gutter={5} columns={24}>
        <Grid.Col span={6}>
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
        </Grid.Col>
        <Grid.Col span={12}>
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
              name='categories'
              data={categories}
              onChange={(value) => setSelected(value)}
              value={selected}
            />

            <button type='submit'>Save post</button>
          </form>
        </Grid.Col>
        <Grid.Col span={6}>Preview</Grid.Col>
      </Grid>
    </div>
  )
}
