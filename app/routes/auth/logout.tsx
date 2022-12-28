import type { ActionArgs } from '@remix-run/node'
import { authenticator } from '~/models/auth/auth.server'

export async function action({ request }: ActionArgs) {
  await authenticator.logout(request, { redirectTo: '/auth/login' })
}
