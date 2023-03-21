import { Container } from '@mantine/core'
import { ActionArgs, json, LoaderArgs, redirect } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import React from 'react'
import { Form, Link } from 'react-router-dom'
import invariant from 'tiny-invariant'
import { isAuthenticated } from '~/utils/server/auth/auth.server'
import { prisma } from '~/utils/server/prisma.server'
import { useOptionalUser } from '~/utils/utilities'

// Ok, this methodworks
export async function loader({ request, params }: LoaderArgs) {
  const loggedInUser = await isAuthenticated(request)
  const username = params.userName

  const user = await prisma.user.findUnique({
    where: {
      userName: username
    },
    select: {
      password: false,
      id: true,
      userName: true,
      email: true,
      avatarUrl: true,
      profile: true,
      chats: loggedInUser
        ? {
            where: {
              users: {
                some: {
                  id: { equals: loggedInUser.id }
                }
              }
            },
            select: {
              id: true,
              users: {
                select: {
                  id: true,
                  userName: true,
                  avatarUrl: true
                }
              }
            }
          }
        : false
    }
  })
  return json({ user })
}

export async function action({ request, params }: ActionArgs) {
  const user = await isAuthenticated(request)
  invariant(user, 'User is not authenticated')
  const formData = await request.formData()
  const action = await formData.get('action')
  const firstName = await formData.get('firstName')
  const lastName = await formData.get('lastName')
  const bio = await formData.get('bio')
  const location = await formData.get('location')
  const education = await formData.get('education')
  const occupation = await formData.get('occupation')
  const profilePicture = await formData.get('profilePicture')

  switch (action) {
    case 'create-chat': {
      const currentUser = await prisma.user.findUnique({
        where: {
          userName: params.userName
        }
      })
      invariant(
        currentUser,
        'cannot create chat with a user that does not exist'
      )
      const existingChat = await prisma.chat.findFirst({
        where: {
          AND: [
            { users: { some: { id: user.id } } },
            { users: { some: { id: currentUser.id } } }
          ]
        },
        select: {
          id: true
        }
      })
      if (existingChat) {
        return redirect(`/chats/${existingChat.id}`)
      }
      const createdChat = await prisma.chat.create({
        select: {
          id: true
        },
        data: {
          users: {
            connect: [{ id: user.id }, { id: currentUser.id }]
          }
        }
      })

      return redirect(`/chats/${createdChat.id}`)
    }

    default: {
      throw new Error(`Unsupported action: ${action}`)
    }
  }
}

export default function UserRoute() {
  const [editing, setEditing] = React.useState(false)
  const data = useLoaderData<typeof loader>()
  const loggedInUser = useOptionalUser()
  const isOwnProfile = loggedInUser?.id === data?.user?.id
  const profile = data?.user?.profile

  const oneOnOneChat = loggedInUser
    ? data.user?.chats.find(
        (c) =>
          // @ts-ignore
          c.users.length === 2 &&
          // @ts-ignore
          c.users.some(
            // @ts-ignore
            (u) => u.id === loggedInUser?.id || u.id === data?.user?.id
          )
      )
    : null
  console.log({ oneOnOneChat })

  return (
    <>
      <h1>User</h1>

      {!editing
        ? profile?.map((profile) => (
            <Container key={profile.id}>
              <h1>
                {profile.firstName} {profile.lastName}
              </h1>
              <p>{profile.bio}</p>
              <p>{profile.location}</p>
              <p>{profile.education}</p>
              <p>{profile.occupation}</p>
              <img src={profile.profilePicture} alt='profile ' />
            </Container>
          ))
        : profile?.map((profile) => (
            <Container key={profile.id}>
              <Form method='post' className='flex flex-col space-y-4'>
                <label
                  htmlFor='firstName'
                  className='text-sm font-medium text-gray-700'
                >
                  First Name
                </label>

                <input
                  id='firstName'
                  name='firstName'
                  type='text'
                  className='block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                  defaultValue={profile.firstName}
                />
                <label
                  htmlFor='lastName'
                  className='text-sm font-medium text-gray-700'
                >
                  Last Name
                </label>
                <input
                  id='lastName'
                  name='lastName'
                  type='text'
                  className='block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                  defaultValue={profile.lastName}
                />
                <label
                  htmlFor='bio'
                  className='text-sm font-medium text-gray-700'
                >
                  Bio
                </label>
                <input
                  id='bio'
                  name='bio'
                  type='text'
                  className='block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                  defaultValue={profile.bio}
                />
                <label
                  htmlFor='location'
                  className='text-sm font-medium text-gray-700'
                >
                  Location
                </label>

                <input
                  id='location'
                  name='location'
                  type='text'
                  className='block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                  defaultValue={profile.location}
                />
                <label
                  htmlFor='education'
                  className='text-sm font-medium text-gray-700'
                >
                  Education
                </label>

                <input
                  id='education'
                  name='education'
                  type='text'
                  className='block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                  defaultValue={profile.education}
                />
                <label
                  htmlFor='occupation'
                  className='text-sm font-medium text-gray-700'
                >
                  Occupation
                </label>

                <input
                  id='occupation'
                  name='occupation'
                  type='text'
                  className='block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                  defaultValue={profile.occupation}
                />
                <label
                  htmlFor='profilePicture'
                  className='text-sm font-medium text-gray-700'
                >
                  Profile Picture
                </label>

                <input
                  id='profilePicture'
                  name='profilePicture'
                  type='text'
                  className='block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                  defaultValue={profile.profilePicture}
                />
                <button type='submit' name='action' value='update-profile'>
                  Update Profile
                </button>
              </Form>
            </Container>
          ))}

      <button onClick={() => setEditing(true)}>Edit Profile</button>
      <strong>Chats:</strong>
      {isOwnProfile ? (
        <div>
          {data?.user?.chats.map((chat) => (
            <Link key={chat.id} to={`/chats/${chat.id}`}>
              Chat {chat.id}
            </Link>
          ))}
        </div>
      ) : oneOnOneChat ? (
        <Link to={`/chats/${oneOnOneChat.id}`}>Chat </Link>
      ) : (
        <>
          <Form method='post'>
            <button type='submit' name='action' value='create-chat'>
              Create Chat
            </button>
          </Form>
        </>
      )}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  )
}
