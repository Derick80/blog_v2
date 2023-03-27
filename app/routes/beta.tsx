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
import { ChevronDownIcon } from '@radix-ui/react-icons'
import { prisma } from '~/utils/server/prisma.server'

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
    imageUrl: validateText(imageUrl),

  }
  const fields = {

    message,
    imageUrl,

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
    user:{
      connect:{
        id:userId
    }
  }
  }
})

  return json({
    message: 'Post created successfully',
  })

}

export default function EditPost() {
  const data = useLoaderData<typeof loader>()
const imageFetcher = useFetcher()
  const actionData = useActionData<typeof action>()

const onSubmit = async ()=>{
  const response = await imageFetcher.submit
  console.log(response)
}

  return (
    <div
    className='mx-auto'
    >
<Form method='post'
className='flex flex-col gap-4 text-black'
onSubmit={onSubmit}
>
        <label htmlFor='userid'>userid</label>
        <input type='text' name='userId' value={data.user.id} />
        <label htmlFor='imageUrl'>imageUrl</label>

        <label htmlFor='message'>message</label>
        <input type='text' name='message'  />
      <button type='submit'>Submit</button>

      </Form>
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
