import { ActionFunction, unstable_parseMultipartFormData, UploadHandler } from '@remix-run/node'
import {
  json,
  unstable_composeUploadHandlers as composeUploadHandlers,
  unstable_createMemoryUploadHandler as createMemoryUploadHandler,
  unstable_parseMultipartFormData as parseMultipartFormData
} from '@remix-run/node'
import { useFetcher } from '@remix-run/react'
import { useEffect } from 'react'
import { isAuthenticated } from '~/models/auth/auth.server'
import { prisma } from '~/models/prisma.server'
import { s3UploadHandler } from '~/models/s3.server'

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
console.log(imageUrl, 'imageUrl');

if (!imageUrl) {
  return json({
    errorMsg: 'Something went wrong while uploading'
  })
}

  if(!title) {
    return json({
      errorMsg: 'Something went wrong while uploading'
    })
  }

  await prisma.imageTest.create({
    data: {
      imageUrl: imageUrl,
      title: title,
      userId: user.id

    }})

  return json({
    imageUrl
  })

}

export default function Uploader() {


  const fetcher = useFetcher<ActionData>()





  useEffect(() => {
    console.log(fetcher.state)
  }, [fetcher])


  const onClick = async () =>
    fetcher.submit(
      {
        imageUrl: 'imageUrl',
        key: 'imageUrl',
        action: '/actions/image',

      },
    )

  return (
    <>
      <fetcher.Form
        method='post'
        encType='multipart/form-data'
        action='/actions/image'
        onClick={onClick}
      >
        <label htmlFor='imageUrl'>Image to upload</label>
        <input id='imageUrl'
         className='text-slate12 rounded-xl bg-crimson12'
        type='file' name='imageUrl' accept='image/*' />
        <button type='submit'>Upload</button>
      </fetcher.Form>
      {fetcher.data ? (
          <>
            <div>
              File has been uploaded to S3 and is available under the following
              URL (if the bucket has public access enabled):
            </div>
            <input type='hidden' name='imageUrl' value={fetcher.data.imageUrl} />
            {fetcher?.data?.imageUrl}
            <div>{fetcher.data.imageUrl}</div>
            <img src={fetcher.data.imageUrl} alt={'#'} />
          </>
        )

      : null}
      <form
        method='post'
      >
        <label htmlFor='imageUrl'>Image to upload</label>
        <input type='text'
         className='text-slate12 rounded-xl bg-crimson12'
        name='imageUrl' value={fetcher?.data?.imageUrl}
        onChange={e => console.log(e.target.value)}
        />
        <label htmlFor='title'>Title</label>
        <input type='text'
          className='text-slate12 rounded-xl bg-crimson12'
        name='title'
        onChange={e => console.log(e.target.value)}
        />

        <button type='submit'>Save post</button>
      </form>

    </>
  )
}
