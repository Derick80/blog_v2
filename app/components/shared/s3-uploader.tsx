import type { ActionFunction, UploadHandler } from '@remix-run/node'
import {
  json,
  unstable_composeUploadHandlers as composeUploadHandlers,
  unstable_createMemoryUploadHandler as createMemoryUploadHandler,
  unstable_parseMultipartFormData as parseMultipartFormData
} from '@remix-run/node'
import { useFetcher } from '@remix-run/react'
import { useEffect } from 'react'
import { s3UploadHandler } from '~/models/s3.server'

type ActionData = {
  errorMsg?: string
  imageUrl?: string
}

export const action: ActionFunction = async ({ request }) => {
  const uploadHandler: UploadHandler = composeUploadHandlers(
    s3UploadHandler,
    createMemoryUploadHandler()
  )
  const formData = await parseMultipartFormData(request, uploadHandler)
  const imageUrl = formData.get('imageUrl')
  if (!imageUrl) {
    return json({
      errorMsg: 'Something went wrong while uploading'
    })
  }
  return json({
    imageUrl
  })
}

export default function Uploader() {
  const fetcher = useFetcher<ActionData>()

  useEffect(() => {
    console.log(fetcher.data)
  }, [fetcher])
  const onClick = () =>
    fetcher.submit(
      {
        imageUrl: 'imageUrl'
      },
      {
        method: 'post',
        action: '/actions/image',
        encType: 'multipart/form-data'
      }
    )

  return (
    <>
      <fetcher.Form
        method='post'
        encType='multipart/form-data'
        onChange={onClick}
      >
        <label htmlFor='imageUrl'>Image to upload</label>
        <input id='imageUrl' type='file' name='imageUrl' accept='image/*' />
      </fetcher.Form>
      {fetcher.type === 'done' ? (
        fetcher.data.errorMsg ? (
          <h2>{fetcher.data.errorMsg}</h2>
        ) : (
          <>
            <div>
              File has been uploaded to S3 and is available under the following
              URL (if the bucket has public access enabled):
            </div>
            <div>{fetcher.data.imageUrl}</div>
            <img src={fetcher.data.imageUrl} alt={'Uploaded  from S3'} />
          </>
        )
      ) : null}
    </>
  )
}
