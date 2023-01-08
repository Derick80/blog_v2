import type { ActionArgs, LoaderFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { authenticator } from '~/models/auth/auth.server'

export const loader: LoaderFunction = () => redirect('/', { status: 404 })

export async function action({ request }: ActionArgs) {
  await authenticator.logout(request, { redirectTo: '/login' })
}
