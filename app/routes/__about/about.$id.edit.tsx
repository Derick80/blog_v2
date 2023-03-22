import { ActionArgs, json, LoaderArgs, redirect } from '@remix-run/node'
import { Form, useFetcher, useLoaderData } from '@remix-run/react'
import TipTap from '~/components/shared/tip-tap'
import { editAbout, getAboutById } from '~/utils/server/about.server'
import { isAuthenticated } from '~/utils/server/auth/auth.server'

export async function loader({ request, params }: LoaderArgs) {
  const { id } = params
  if (!id) {
    throw new Error('id is required')
  }
  const user = await isAuthenticated(request)
  if (!user) {
    throw new Error('Not Authenticated')
  }

  const about = await getAboutById(id)
  if (!about) {
    throw new Error('About not found')
  }

  return json({ about })
}

export async function action({ request, params }: ActionArgs) {
  const { id } = params
  if (!id) {
    throw new Error('id is required')
  }
  const user = await isAuthenticated(request)
  if (!user) {
    throw new Error('Not Authenticated')
  }
  const formData = await request.formData()
  const userName = formData.get('userName')
  const firstName = formData.get('firstName')
  const lastName = formData.get('lastName')
  const email = formData.get('email')
  const bio = formData.get('bio')
  const location = formData.get('location')
  const education = formData.get('education')
  const occupation = formData.get('occupation')
  const profilePicture = formData.get('profilePicture')

  if (
    typeof userName !== 'string' ||
    typeof firstName !== 'string' ||
    typeof lastName !== 'string' ||
    typeof email !== 'string' ||
    typeof bio !== 'string' ||
    typeof location !== 'string' ||
    typeof education !== 'string' ||
    typeof occupation !== 'string' ||
    typeof profilePicture !== 'string'
  ) {
    throw new Error('Something went wrong while uploading')
  }

  const input = {
    id,
    userName,
    firstName,
    lastName,
    email,
    bio,
    location,
    education,
    occupation,
    profilePicture
  }

  await editAbout(input)

  return redirect(`/about`)
}

export default function AboutEdit() {
  const data = useLoaderData<typeof loader>()
  const profileImageFetcher = useFetcher()
  const onClick = async () =>
    profileImageFetcher.submit({
      imageUrl: 'imageUrl',
      key: 'imageUrl',
      action: '/actions/cloudinary'
    })
  return (
    <div className='flex flex-col items-center justify-center py-2'>
      <h1>Edit About</h1>
      <Form
        method='post'
        id='editAbout'
        className='flex w-[350px] flex-col gap-2'
      >
        <label className='text-sm font-semibold' htmlFor='userName'>
          User Name
        </label>
        <input
          className='w-full p-2 text-black shadow-md '
          id='userName'
          name='userName'
          type='text'
          defaultValue={data.about.userName}
        />
        <label className='text-sm font-semibold' htmlFor='firstName'>
          First Name
        </label>
        <input
          className='w-full p-2 text-black shadow-md '
          id='firstName'
          name='firstName'
          type='text'
          defaultValue={data.about.firstName}
        />
        <label className='text-sm font-semibold' htmlFor='lastName'>
          Last Name
        </label>
        <input
          className='w-full p-2 text-black shadow-md '
          id='lastName'
          name='lastName'
          type='text'
          defaultValue={data.about.lastName}
        />
        <label htmlFor='email'>Email</label>
        <input
          className='w-full p-2 text-black shadow-md '
          id='email'
          name='email'
          type='text'
          defaultValue={data.about.email}
        />
        <label className='text-sm font-semibold' htmlFor='bio'>
          Bio
        </label>

        {data.about.bio && <TipTap content={data.about.bio} />}
        <input type='hidden' name='bio' value={data.about.bio} />
        <label className='text-sm font-semibold' htmlFor='location'>
          Location
        </label>
        <input
          className='w-full p-2 text-black shadow-md '
          id='location'
          name='location'
          type='text'
          defaultValue={data.about.location}
        />
        <label className='text-sm font-semibold' htmlFor='education'>
          Education
        </label>
        <input
          className='w-full p-2 text-black shadow-md '
          id='education'
          name='education'
          type='text'
          defaultValue={data.about.education}
        />
        <label className='text-sm font-semibold' htmlFor='occupation'>
          Occupation
        </label>
        <input
          className='w-full p-2 text-black shadow-md '
          id='occupation'
          name='occupation'
          type='text'
          defaultValue={data.about.occupation}
        />
        <label className='text-sm font-semibold' htmlFor='profilePicture'>
          Profile Picture
        </label>

        <input
          type='hidden'
          id='profilePicture'
          name='profilePicture'
          value={profileImageFetcher?.data?.imageUrl}
        />
      </Form>
      <div className='flex flex-col gap-2'>
        <profileImageFetcher.Form
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
        </profileImageFetcher.Form>
        {profileImageFetcher.data ? (
          <div className='items-c enter flex flex-col'>
            <p className='text-sm text-gray-500'>Image Uploaded</p>
            <input
              type='hidden'
              name='imageUrl'
              value={profileImageFetcher?.data?.imageUrl}
            />
            <div className='h-[100px] w-[100px] rounded-xl bg-crimson12 text-slate12'>
              <img src={profileImageFetcher?.data?.imageUrl} alt={'#'} />
            </div>
          </div>
        ) : null}
      </div>
      <button type='submit' form='editAbout'>
        Submit
      </button>
    </div>
  )
}
