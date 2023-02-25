import { Button } from '@mantine/core'
import { LoaderArgs, json, ActionArgs, redirect } from '@remix-run/node'
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigation
} from '@remix-run/react'
import { useEffect } from 'react'
import invariant from 'tiny-invariant'
import { ToastProvider, useToast } from '~/components/shared/toaster'
import { getAbout } from '~/utils/server/about.server'
import { isAuthenticated } from '~/utils/server/auth/auth.server'
import {
  commitSession,
  flash,
  flashAndCommit,
  getSession
} from '~/utils/server/auth/session.server'
import { createMiniPost, getMiniPosts } from '~/utils/server/post.server'
import { prisma } from '~/utils/server/prisma.server'

export async function loader({ request }: LoaderArgs) {
  const user = await isAuthenticated(request)
  if (!user) {
    return json({ error: 'Not logged in' }, { status: 401 })
  }

  const miniPosts = await getMiniPosts(user.id)

  invariant(miniPosts, 'Mini posts not found')

  return json({ user, miniPosts })
}

export async function action({ request }: ActionArgs) {
  const user = await isAuthenticated(request)
  if (!user) {
    return json({ error: 'Not logged in' }, { status: 401 })
  }
  const userId = user.id
  const formData = await request.formData()
  const message = formData.get('message')

  if (typeof message !== 'string') {
    return json({ error: 'Invalid message' }, { status: 400 })
  }

  await createMiniPost({
    message,
    userId
  })

  const session = await getSession(request)
  await flash(session, 'success, Mini post created!')

  const headers = await flashAndCommit(request, 'success, Mini post created!')

  return json({ success: true }, { headers })
}

export default function Page() {
  const { toast } = useToast()
  const action = useActionData()
  const data = useLoaderData<typeof loader>()
  const transition = useNavigation()

  useEffect(() => {
    if (action && action.message) {
      toast(action.message)
    }
  }, [action, action])

  return (
    <ToastProvider>
      <div>{JSON.stringify(data.miniPosts)}</div>
      <Form method='post'>
        <input type='hidden' name='userId' value={data.user.id} />
        <label htmlFor='message'>Message</label>
        <input type='text' name='message' id='message' />
        <Button type='submit' loading={transition.state !== 'idle'}>
          Submit
        </Button>
      </Form>
    </ToastProvider>
  )
}
