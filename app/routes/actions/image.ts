import {
  ActionFunction,
  unstable_parseMultipartFormData
} from '@remix-run/node'
import { json } from '@remix-run/node'
import { s3UploadHandler } from '~/models/s3.server'

export const action: ActionFunction = async ({ request, params }) => {
  async function uploadImage(request: Request) {
    const formData = await unstable_parseMultipartFormData(
      request,
      s3UploadHandler
    )
    const imageUrl = formData.get('imageUrl') || ''
    if (!imageUrl) {
      return { error: 'No image uploaded' }
    }
    return imageUrl
  }
  const imageUrl = await uploadImage(request)

  return json({ imageUrl })
}
