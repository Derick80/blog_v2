import { Button, Image } from '@mantine/core'
import type { ActionArgs, LoaderArgs } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { json } from '@remix-run/node'
import {
  Form,
  useCatch,
  useFetcher,
  useLoaderData,
  useNavigation,
  useParams
} from '@remix-run/react'
import { badRequest } from 'remix-utils'
import invariant from 'tiny-invariant'
import { prisma } from '~/utils/server/prisma.server'

import { editUserProfile } from '~/utils/server/profile.server'
import { getUserById } from '~/utils/server/user.server'

export async function loader({ params }: LoaderArgs) {
  const { id } = params
  if (!id) {
    throw new Error('id is required')
  }
  const users = await getUserById(id)
  invariant(users, 'users is required')
  const userProfile = await prisma.profile.findUnique({
    where: {
      userId: id
    }
  })
  if (!userProfile) {
    throw new Error('userProfile is required')
  }
  return json({
    user: users,
    profile: userProfile
  })
}

export async function action({ request, params }: ActionArgs) {
  const formData = await request.formData()
  const bio = await formData.get('bio')
  const id = await formData.get('id')
  const profilePicture = await formData.get('profilePicture')
  const userName = await formData.get('userName')
  const education = await formData.get('education')
  const occupation = await formData.get('occupation')
  const location = await formData.get('location')
  const firstName = await formData.get('firstName')
  const lastName = await formData.get('lastName')
  const email = await formData.get('email')

  if (
    typeof bio !== 'string' ||
    typeof id !== 'string' ||
    typeof profilePicture !== 'string' ||
    typeof userName !== 'string' ||
    typeof education !== 'string' ||
    typeof occupation !== 'string' ||
    typeof location !== 'string' ||
    typeof firstName !== 'string' ||
    typeof lastName !== 'string' ||
    typeof email !== 'string'
  ) {
    return badRequest({ message: 'Invalid form data' })
  }

  const input = {
    id,
    bio,
    profilePicture,
    userName,
    education,
    occupation,
    location,
    firstName,
    lastName,
    email
  }

  await editUserProfile({
    input
  })

  return redirect(`/users/`)
}
export default function UserProfileRoute() {
  const navigation = useNavigation()

  const text =
    navigation.state === 'submitting'
      ? 'Saving...'
      : navigation.state === 'loading'
      ? 'Saved!'
      : 'Update Profile'

  const data = useLoaderData<typeof loader>()
  const {
    id,
    bio,
    profilePicture,
    userName,
    education,
    occupation,
    location,
    firstName,
    lastName,
    email
  } = data.profile

  const userPictureFetcher = useFetcher()
  const onClick = async () =>
    userPictureFetcher.submit({
      imageUrl: 'imageUrl',
      key: 'imageUrl',
      action: '/actions/cloudinary'
    })
  return (
    <div className='flex flex-col items-center justify-center'>
      {data.profile ? (
        <>
          <Form
            method='post'
            id='edit-profile'
            className='flex w-[350px] flex-col gap-2 md:w-[650px]'
          >
            <input type='hidden' name='id' value={id} />
            <input
              className='w-full p-2 text-slate12 shadow-md '
              type='text'
              name='education'
              defaultValue={education}
            />
            <input
              className='w-full p-2 text-slate12 shadow-md '
              type='text'
              name='occupation'
              defaultValue={occupation}
            />
            <input
              type='text'
              name='location'
              className='w-full p-2 text-slate12 shadow-md '
              defaultValue={location}
            />
            <input
              type='text'
              className='w-full p-2 text-slate12 shadow-md '
              name='userName'
              defaultValue={userName}
            />
            <input
              type='text'
              className='w-full p-2 text-slate12 shadow-md '
              name='firstName'
              defaultValue={firstName}
            />
            <input
              type='text'
              className='w-full p-2 text-slate12 shadow-md '
              name='lastName'
              defaultValue={lastName}
            />
            <input
              type='text'
              name='bio'
              className='w-full p-2 text-slate12 shadow-md '
              defaultValue={bio}
            />

            <input
              type='email'
              className='w-full p-2 text-slate12 shadow-md '
              name='email'
              defaultValue={email}
            />
            <Image src={profilePicture} alt='Profile Picture' />
            <input
              type='hidden'
              name='profilePicture'
              value={userPictureFetcher?.data?.imageUrl}
            />
          </Form>
          <div className='flex flex-col gap-2'>
            <userPictureFetcher.Form
              method='post'
              encType='multipart/form-data'
              action='/actions/cloudinary'
              onClick={onClick}
              className='flex flex-col gap-2'
            >
              <label htmlFor='imageUrl' className='text-sm font-semibold'>
                Upload a Project Image
              </label>
              <input
                type='file'
                name='imageUrl'
                id='imageUrl'
                className='rounded-md p-2 shadow-md'
                accept='image/*'
              />
              <button>Upload</button>
            </userPictureFetcher.Form>
            {userPictureFetcher.data ? (
              <div className='items-c enter flex flex-col'>
                <p className='text-sm text-gray-500'>Image Uploaded</p>
                <input
                  type='hidden'
                  name='imageUrl'
                  value={userPictureFetcher?.data?.imageUrl}
                />
                <div className='h-[100px] w-[100px] rounded-xl  text-slate12'>
                  <img src={userPictureFetcher?.data?.imageUrl} alt={'#'} />
                </div>
              </div>
            ) : null}
          </div>
          <Button type='submit' form='edit-profile'>
            {text}
          </Button>
        </>
      ) : (
        <div>Profile not found</div>
      )}
    </div>
  )
}

export function CatchBoundary() {
  const caught = useCatch()
  const params = useParams()
  if (caught.status === 404) {
    return <div>Profile with ID {params.userId} not found</div>
  }
  throw new Error(`unexpected caught response with status: ${caught.status}`)
}
