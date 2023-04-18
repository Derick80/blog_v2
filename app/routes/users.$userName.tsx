import type { ActionArgs, LoaderArgs } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
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
  const data = useLoaderData<typeof loader>()
  const loggedInUser = useOptionalUser()
  const isOwnProfile = loggedInUser?.id === data?.user?.id

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

  return (
    <div>
      <h1>User</h1>
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
    </div>
  )
}
