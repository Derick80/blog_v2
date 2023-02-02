import { Button, Textarea, TextInput, Image } from '@mantine/core'
import { ActionArgs, LoaderArgs, redirect } from '@remix-run/node'
import { json, Response } from '@remix-run/node'
import {
  Form,
  Link,
  NavLink,
  Outlet,
  useActionData,
  useCatch,
  useLoaderData,
  useMatches,
  useNavigation,
  useParams
} from '@remix-run/react'
import React from 'react'
import { badRequest } from 'remix-utils'
import invariant from 'tiny-invariant'
import TipTap from '~/components/shared/tip-tap'
import { UserType } from '~/utils/schemas/user-schema'
import { prisma } from '~/utils/server/prisma.server'
import { editUserProfile, Profile } from '~/utils/server/profile.server'
import { getProfiles, getUserProfile } from '~/utils/server/profile.server'
import { getUserById } from '~/utils/server/user.server'

export async function loader({ params, request }: LoaderArgs) {
  const userId = params.userId
  invariant(userId, 'userId is required')
  const users = await getUserById(userId)
  const userProfile = await getUserProfile(userId)

  return json({
    user: users,
    profile: userProfile
  })
}

export async function action({ request, params }: ActionArgs) {
  const formData = await request.formData()
  const id = await formData.get('id')
  const userId = await formData.get('userId')
  const bio = await formData.get('bio')

  const profilePicture = await formData.get('profilePicture')
  const userName = await formData.get('userName')
  const education = await formData.get('education')
  const occupation = await formData.get('occupation')
  const location = await formData.get('location')
  const firstName = await formData.get('firstName')
  const lastName = await formData.get('lastName')
  const email = await formData.get('email')

  if (
    typeof id !== 'string' ||
    typeof userId !== 'string' ||

    bio !== 'string' ||
    typeof profilePicture !== 'string' ||
    typeof userName !== 'string' ||
    typeof education !== 'string' ||
    typeof occupation !== 'string' ||
    typeof location !== 'string' ||
    typeof firstName !== 'string' ||
    typeof lastName !== 'string' ||
    typeof email !== 'string' ||
    typeof userId !== 'string'

  ) {
    return badRequest({
      message: 'Invalid form data',
    })
  }



  await editUserProfile({
    id,
bio,
profilePicture,
userName,
education,
occupation,
location,
firstName,
lastName,
email,
user:{
  connect:{
    id:userId

  }
}
  })

  return redirect(`/users/${userId}`)
}

export default function UserProfileRoute() {
  const navigation = useNavigation()
  const actionData = useActionData<typeof action>();

  const text =
    navigation.state === "submitting"
      ? "Saving..."
      : navigation.state === "loading"
      ? "Saved!"
      : "Update Profile";


  const data = useLoaderData<{
    profile: Profile,
    user: UserType
  }
  >()
  const {id, bio, profilePicture, userName, education, occupation, location, firstName, lastName, email, userId} = data.profile


  return (
    <div className='col-span-4 p-2 md:col-span-1 md:col-start-3 md:col-end-11'>
      {data.profile ? (
        <Form method='post'
          reloadDocument

        >
          <input type='hidden' name='id' defaultValue={
            id} />
          <input type='hidden' name='userId' defaultValue={
            userId} />

          <TipTap
            content={
              bio}/>
          <input type='hidden' name='bio' defaultValue={
            bio} />

          <TextInput
            label='Education'
            name='education'

            defaultValue={
              education}


              aria-invalid={
                Boolean(actionData?.fieldErrors?.education) ||
                undefined
              }
              aria-errormessage={
                actionData?.fieldErrors?.education
                  ? "education-error"
                  : undefined
              }

          />
          <TextInput
            label='Occupation'
            name='occupation'
            defaultValue={
              occupation}
          />
          <TextInput
            label='Location'
            name='location'
            defaultValue={
              location}
          />
          <TextInput
            label='User Name'
            name='userName'
            defaultValue={
              userName}
          />
          <TextInput
            label='First Name'
            name='firstName'
            defaultValue={
              firstName}
          />
          <TextInput
            label='Last Name'
            name='lastName'
            defaultValue={
              lastName}
          />
          <Textarea
            label='Email'
            name='email'
            defaultValue={
              email}
          />
          <Image src={profilePicture} alt='Profile Picture' />
              <input type='hidden' name='profilePicture' defaultValue={
                profilePicture} />

          <Button type='submit'>{text}</Button>
        </Form>
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
