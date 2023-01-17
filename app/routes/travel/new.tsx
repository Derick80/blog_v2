import {
  ActionArgs,
  ActionFunction,
  json,
  LoaderArgs,
  redirect
} from '@remix-run/node'
import { Form, useFetcher, useLoaderData } from '@remix-run/react'
import React, { useEffect } from 'react'
import { Outlet, useActionData } from 'react-router'
import { badRequest } from 'remix-utils'
import invariant from 'tiny-invariant'
import FormField from '~/components/shared/form-field'
import Uploader from '~/components/shared/s3-uploader'
import { isAuthenticated } from '~/models/auth/auth.server'
import { createTravelLog } from '~/models/travel.server'
import { validateText } from '~/utils/validators.server'

type ActionData = {
  errorMsg?: string
  imageUrl?: string
}

export async function loader({ request, params }: LoaderArgs) {
  const user = await isAuthenticated(request)
  invariant(user, 'You must be signed in to view this page')

  return json({ user })
}

export const action: ActionFunction = async ({
  request,
  params
}: ActionArgs) => {
  const user = await isAuthenticated(request)
  invariant(user, 'You must be signed in to view this page')
  const formData = await request.formData()
  const imageTitle = formData.get('imageTitle') as string
  const imageDescription = formData.get('imageDescription') as string
  const imageUrl = formData.get('imageUrl') as string
  const album = formData.get('album')
  const city = formData.get('city')
  const year = formData.get('year')
  const userId = user.id

  if (
    typeof imageTitle !== 'string' ||
    typeof imageDescription !== 'string' ||
    typeof imageUrl !== 'string' ||
    typeof album !== 'string' ||
    typeof city !== 'string' ||
    typeof year !== 'string' ||
    typeof userId !== 'string'
  ) {
    return badRequest({
      formError: 'Please fill out all fields'
    })
  }

  const fieldErrors = {
    imageTitle: validateText(imageTitle),
    imageDescription: validateText(imageDescription),
    imageUrl: validateText(imageUrl),
    album: validateText(album),
    city: validateText(city),
    year: validateText(year),
    userId: validateText(userId)
  }

  const fields = { imageTitle, imageDescription, imageUrl, album, city, year }

  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({
      fieldErrors,
      fields,
      form: action
    })
  }

  await createTravelLog({
    ...fields,
    userId
  })

  return redirect('/travel')
}

export default function NewTravelLog() {
  const data = useLoaderData<typeof loader>()

  const [formData, setFormData] = React.useState({
    imageTitle: '',
    imageDescription: '',
    imageUrl: '',
    album: '',
    city: '',
    year: '',
    userId: data.user.id
  })
  const fetcher = useFetcher<ActionData>()
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

  const handleInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
    field: string
  ) => {
    setFormData((form) => ({ ...form, [field]: event.target.value }))
  }
  const handleFileUpload = async (file: File) => {
    const inputFormData = new FormData()
    inputFormData.append('imageUrl', file)
    const response = await fetch('/image', {
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

  return (
    <div className='flex flex-col items-center'>
      <div>{}</div>

      <h1 className='mh1'>Upload a new PhotoLog</h1>

      <form className='form-primary' method='post'>
        <FormField
          label='Image Title'
          name='imageTitle'
          type='text'
          value={formData.imageTitle}
          onChange={(
            event: React.ChangeEvent<
              HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
            >
          ) => handleInputChange(event, 'imageTitle')}
        />

        <FormField
          label='Image Description'
          name='imageDescription'
          type='text'
          value={formData.imageDescription}
          onChange={(
            event: React.ChangeEvent<
              HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
            >
          ) => handleInputChange(event, 'imageDescription')}
        />

        <FormField
          label='Image Url'
          name='imageUrl'
          type='text'
          value={formData.imageUrl}
          onChange={(
            event: React.ChangeEvent<
              HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
            >
          ) => handleInputChange(event, 'imageUrl')}
        />

        <FormField
          label='Album'
          name='album'
          type='text'
          value={formData.album}
          onChange={(
            event: React.ChangeEvent<
              HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
            >
          ) => handleInputChange(event, 'album')}
        />

        <FormField
          label='City'
          name='city'
          type='text'
          value={formData.city}
          onChange={(
            event: React.ChangeEvent<
              HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
            >
          ) => handleInputChange(event, 'city')}
        />
        <fetcher.Form method='post' encType='multipart/form-data'>
          <label htmlFor='imageUrl'>Image to upload</label>
          <input id='imageUrl' type='file' name='imageUrl' accept='image/*' />
          <button onClick={onClick}>Save</button>
        </fetcher.Form>
        {fetcher.type === 'done' ? (
          fetcher.data.errorMsg ? (
            <h2>{fetcher.data.errorMsg}</h2>
          ) : (
            <>
              <div>
                File has been uploaded to S3 and is available under the
                following URL (if the bucket has public access enabled):
              </div>
              <div>{fetcher.data.imageUrl}</div>
              <input
                type='text'
                name='imageUrl'
                value={fetcher.data.imageUrl}
                onChange={(event) => handleInputChange(event, 'imageUrl')}
              />
            </>
          )
        ) : null}

        <FormField
          label='Year'
          name='year'
          type='text'
          value={formData.year}
          onChange={(
            event: React.ChangeEvent<
              HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
            >
          ) => handleInputChange(event, 'year')}
        />
        <></>
        <button className='btn-base btn-solid-success' type='submit'>
          Submit
        </button>
      </form>
    </div>
  )
}
