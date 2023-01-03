import { LoaderArgs, json, ActionArgs, redirect } from '@remix-run/node'
import { Form, useLoaderData, useNavigate } from '@remix-run/react'
import React, { useTransition } from 'react'
import { badRequest } from 'remix-utils'
import invariant from 'tiny-invariant'
import FormField from '~/components/shared/form-field'
import { Modal } from '~/components/shared/layout/modal'
import { isAuthenticated } from '~/models/auth/auth.server'
import { getJImageById, updateJImage } from '~/models/j-images.server'
import { getTravelLogById, updateTravelLog } from '~/models/travel.server'

export async function loader({ request, params }: LoaderArgs) {
  const user = await isAuthenticated(request)
  invariant(user, 'user is required')
  const imageId = Number(params.imageId)
  const image = await getTravelLogById(imageId)

  // if(!photo) return redirect('/travel'    )
  return json({ image })
}

export async function action({ request, params }: ActionArgs) {
  const formData = await request.formData()

  const id = Number(params.imageId)
  const userId = formData.get('userId')
  const imageTitle = formData.get('imageTitle')
  const imageUrl = formData.get('imageUrl')
  const imageDescription = formData.get('imageDescription')
  const album = formData.get('album')
  const year = formData.get('year')
  console.log('formData', imageDescription)

  if (
    typeof id !== 'number' ||
    typeof userId !== 'string' ||
    typeof imageTitle !== 'string' ||
    typeof imageUrl !== 'string' ||
    typeof imageDescription !== 'string' ||
    typeof album !== 'string' ||
    typeof year !== 'string'
  ) {
    return badRequest({
      fieldErrors: null,
      fields: null,
      formError: `Please fill out all fields`
    })
  }

  const fieldErrors = {
    imageTitle:
      imageTitle.length < 3 ? 'Title must be at least 3 characters' : null,
    imageDescription:
      imageDescription.length < 3
        ? 'Description must be at least 3 characters'
        : null,
    imageUrl:
      imageUrl.length < 3 ? 'Image URL must be at least 3 characters' : null
  }

  const fields = {
    id,
    imageTitle,
    imageUrl,
    imageDescription,
    album,
    year
  }

  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({
      fieldErrors,
      fields,
      formError: null
    })
  }

  await updateTravelLog({ ...fields })

  return redirect(`/travel`)
}
export default function EditRoute() {
  const navigate = useNavigate()
  const transition = useTransition()
  const data = useLoaderData<typeof loader>()
  const [formData, setFormData] = React.useState({
    imageUrl: data.image.imageUrl,
    imageTitle: data.image.imageTitle || '',
    imageDescription: data.image.imageDescription || '',
    album: data.image.album || '',
    year: data.image.year || '',

    userId: data.image.userId
  })

  return (
    <Modal
      isOpen={true}
      ariaLabel='Edit Income'
      className='h-3/4 w-full md:w-1/2 lg:w-2/3'
    >
      {' '}
      <h1 className='mh1 text-center'>Edit</h1>
      <Form
        method='post'
        className='form-primary flex flex-col items-center justify-center space-y-4'
      >
        <input
          id='userId'
          name='userId'
          type='hidden'
          value={data.image.userId}
          onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
        />
        <label htmlFor='imageUrl'>Image URL</label>

        <FormField
          name='imageUrl'
          type='text'
          value={formData.imageUrl}
          onChange={(e) =>
            setFormData({ ...formData, imageUrl: e.target.value })
          }
        />
        <label htmlFor='imageTitle'>Image Title</label>
        <FormField
          type='text'
          name='imageTitle'
          value={formData.imageTitle}
          onChange={(e) =>
            setFormData({ ...formData, imageTitle: e.target.value })
          }
        />
        <label htmlFor='imageDescription'>Image Description</label>

        <FormField
          id='imageDescription'
          name='imageDescription'
          type='text'
          value={formData.imageDescription}
          onChange={(e) =>
            setFormData({ ...formData, imageDescription: e.target.value })
          }
        />

        <label htmlFor='album'>Album</label>
        <FormField
          name='album'
          type='text'
          value={formData.album}
          onChange={(e) => setFormData({ ...formData, album: e.target.value })}
        />

        <label htmlFor='year'>Year</label>
        <FormField
          name='year'
          type='text'
          value={formData.year}
          onChange={(e) => setFormData({ ...formData, year: e.target.value })}
        />

        <div className='h-32 w-64'>
          <img
            src={formData.imageUrl}
            alt={formData.imageTitle}
            className='h-full w-full object-cover'
          />
        </div>
        <div className='flex space-x-4'>
          <button
            type='submit'
            className='btn-base btn-solid-success space-x-1'
          >
            <p>{transition.state === 'submitting' ? 'Saving...' : 'Save'}</p>
          </button>
          <button
            type='button'
            className='btn-base btn-solid-danger'
            onClick={() => navigate('/travel')}
          >
            Cancel
          </button>
        </div>
      </Form>
    </Modal>
  )
}
