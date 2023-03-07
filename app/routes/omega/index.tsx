import { Button } from '@mantine/core'
import type { LoaderArgs, ActionArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigation
} from '@remix-run/react'
import { useEffect } from 'react'
import invariant from 'tiny-invariant'
import { ToastProvider, useToast } from '~/components/shared/toaster'
import { isAuthenticated } from '~/utils/server/auth/auth.server'

export async function loader({ request }: LoaderArgs) {
  const user = await isAuthenticated(request)
  if (!user) {
    return json({ error: 'Not logged in' }, { status: 401 })
  }

  return json({ user })
}

export async function action({ request }: ActionArgs) {}

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
      <Form method='post'>
        <Button type='submit' loading={transition.state !== 'idle'}>
          Submit
        </Button>
      </Form>
    </ToastProvider>
  )
}
