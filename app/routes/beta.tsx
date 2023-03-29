import type { ActionArgs, LoaderArgs } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import {
  Form,
  useActionData,
  useCatch,
  useFetcher,
  useLoaderData,
  useNavigation
} from '@remix-run/react'
import { Listbox } from '@headlessui/react'
import invariant from 'tiny-invariant'
import { isAuthenticated } from '~/utils/server/auth/auth.server'
import { getPostToEdit } from '~/utils/server/post.server'
import {
  deletePost,
  publishPost,
  savePost,
  unPublishPost
} from '~/utils/server/post.server'
import { validateText } from '~/utils/validators.server'
import { MultiSelect, Switch } from '@mantine/core'
import TipTap from '~/components/shared/tip-tap'
import { useState } from 'react'
import getAllCategories from '~/utils/server/categories.server'
import { useOptionalUser } from '~/utils/utilities'
import type { MetaFunction } from '@remix-run/node' // or cloudflare/deno
import { badRequest } from 'remix-utils'
import { ChevronDownIcon, PlusCircledIcon } from '@radix-ui/react-icons'
import { prisma } from '~/utils/server/prisma.server'
import Button from '~/components/shared/layout/button'

export const meta: MetaFunction = () => {
  return {
    title: "Edit Post | Derick's Blog",
    description:
      "Edit a post on Derick's blog and share your knowledge with the world"
  }
}
export async function loader({ params, request }: LoaderArgs) {
  const user = await isAuthenticated(request)
  if (!user) {
    throw new Response('Not authenticated', {
      status: 401
    })
  }

  return json({ user })
}

export async function action({ params, request }: ActionArgs) {
  const user = await isAuthenticated(request)
  invariant(user, 'user is required')
  const formData = await request.formData()
  const userId = formData.get('userId')
  const message = formData.get('message')
  const imageUrl = formData.get('imageUrl')
  const featured = Boolean(formData.get('featured'))
  const categories = formData.get('categories')

  if (
    typeof message !== 'string' ||
    typeof userId !== 'string' ||
    typeof imageUrl !== 'string'
  ) {
    return badRequest({
      fieldErrors: null,
      fields: null,
      formError: 'Invalid form data'
    })
  }

  const fieldErrors = {
    message: validateText(message),
    imageUrl: validateText(imageUrl)
  }
  const fields = {
    message,
    imageUrl
  }
  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({
      fieldErrors,
      fields,
      formError: null
    })
  }

  await prisma.miniPostWithImage.create({
    data: {
      message,
      imageUrl,
      user: {
        connect: {
          id: userId
        }
      }
    }
  })

  return json({
    message: 'Post created successfully'
  })
}

export default function EditPost() {
  const data = useLoaderData<typeof loader>()
  const imageFetcher = useFetcher()
  const actionData = useActionData<typeof action>()

  const onSubmit = async () => {
    const response = await imageFetcher.submit
    console.log(response)
  }

  return (
    <div className='flex w-screen flex-col  gap-4'>
      <div className='flex flex-row gap-4'>
        regular
        <Button variant='regular' size='regular'>
          Create
        </Button>
        <Button variant='regular' size='large'>
          Create
        </Button>
        <Button variant='regular' size='small'>
          Create
        </Button>
      </div>
      <div className='flex flex-row gap-4'>
        outline
        <Button variant='outline' size='regular'>
          Create
        </Button>
        <Button variant='outline' size='large'>
          Create
        </Button>
        <Button variant='outline' size='small'>
          Create
        </Button>
      </div>

      <div className='flex flex-row gap-4'>
        Unfilled
        <Button variant='unfilled' size='regular'>
          Create
        </Button>
        <Button variant='unfilled' size='large'>
          Create
        </Button>
        <Button variant='unfilled' size='small'>
          Create
        </Button>
      </div>

      <div>
        regular
        <Button variant='regular' size='small'>
          Create <PlusCircledIcon />
        </Button>
        unfilled
        <Button variant='unfilled' size='small'>
          <PlusCircledIcon />
        </Button>
      </div>
    </div>
  )
}
export function CatchBoundary() {
  const caught = useCatch()

  return (
    <div>
      <h1>Caught</h1>
      <p>Status: {caught.status}</p>
      <pre>
        <code>{JSON.stringify(caught.data, null, 2)}</code>
      </pre>
    </div>
  )
}
