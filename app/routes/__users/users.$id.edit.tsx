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
    !bio ||
    !id ||
    !profilePicture ||
    !userName ||
    !education ||
    !occupation ||
    !location ||
    !firstName ||
    !lastName ||
    !email
  ) {
    throw new Error('All fields are required')
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
            <label htmlFor='education' className='text-sm font-semibold'>
              Education
            </label>

            <input
              className='w-full p-2 text-black shadow-md '
              type='text'
              name='education'
              defaultValue={education}
            />
            <label htmlFor='occupation' className='text-sm font-semibold'>
              Occupation
            </label>
            <input
              className='w-full p-2 text-black shadow-md '
              type='text'
              name='occupation'
              defaultValue={occupation}
            />
            <label htmlFor='location' className='text-sm font-semibold'>
              Location
            </label>
            <input
              type='text'
              name='location'
              className='w-full p-2 text-black shadow-md '
              defaultValue={location}
            />
            <label htmlFor='userName' className='text-sm font-semibold'>
              Username
            </label>

            <input
              type='text'
              className='w-full p-2 text-black shadow-md '
              name='userName'
              defaultValue={userName}
            />
            <label htmlFor='firstName' className='text-sm font-semibold'>
              First Name
            </label>

            <input
              type='text'
              className='w-full p-2 text-black shadow-md '
              name='firstName'
              defaultValue={firstName}
            />

            <label htmlFor='lastName' className='text-sm font-semibold'>
              Last Name
            </label>

            <input
              type='text'
              className='w-full p-2 text-black shadow-md '
              name='lastName'
              defaultValue={lastName}
            />
            <label htmlFor='bio' className='text-sm font-semibold'>
              Bio
            </label>

            <input
              type='text'
              name='bio'
              className='w-full p-2 text-black shadow-md '
              defaultValue={bio}
            />

            <label htmlFor='email' className='text-sm font-semibold'>
              Email
            </label>

            <input
              type='email'
              className='w-full p-2 text-black shadow-md '
              name='email'
              defaultValue={email}
            />
            <Image src={profilePicture} alt='Profile Picture' />
            <input
              type='hidden'
              name='profilePicture'
              value={userPictureFetcher?.data?.imageUrl || profilePicture}
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
                <div className='h-[100px] w-[100px] rounded-xl bg-crimson12 text-slate12'>
                  <img src={userPictureFetcher?.data?.imageUrl} alt={'#'} />
                </div>
              </div>
            ) : null}
          </div>
        </>
      ) : (
        <div>Profile not found</div>
      )}
      <Button type='submit' variant='outline' form='edit-profile'>
        {text}
      </Button>
    </div>
  )
}

export function CatchBoundary() {
  const caught = useCatch()
  const params = useParams()
  if (caught.status === 404) {
    return <div>User with ID {params.id} not found</div>
  }
  throw new Error(`unexpected caught response with status: ${caught.status}`)
}
