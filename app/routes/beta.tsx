import type { ActionArgs, LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import {
  useActionData,
  useCatch,
  useFetcher,
  useLoaderData
} from '@remix-run/react'
import invariant from 'tiny-invariant'
import { isAuthenticated } from '~/utils/server/auth/auth.server'
import { validateText } from '~/utils/validators.server'
// or cloudflare/deno
import { badRequest } from 'remix-utils'
import { PlusCircledIcon } from '@radix-ui/react-icons'
import { prisma } from '~/utils/server/prisma.server'
import Button from '~/components/shared/button'

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
      <div className='flex flex-row items-center gap-4'>
        regular
        <Button variant='filled' size='small'>
          Create
        </Button>
        <Button variant='filled' size='base'>
          Create
        </Button>
        <Button variant='filled' size='large'>
          Create
        </Button>
      </div>
      <div className='flex flex-row items-center gap-4'>
        outline
        <Button variant='outline' size='small'>
          Create
        </Button>
        <Button variant='outline' size='base'>
          Create
        </Button>
        <Button variant='outline' size='large'>
          Create
        </Button>
      </div>

      <div className='flex flex-row items-center gap-4'>
        Unfilled
        <Button variant='unfilled' size='small'>
          Create
        </Button>
        <Button variant='unfilled' size='base'>
          Create
        </Button>
        <Button variant='unfilled' size='large'>
          Create
        </Button>
      </div>

      <div>
        regular
        <Button variant='filled' size='small'>
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
