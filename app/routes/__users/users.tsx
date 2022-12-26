import type { LoaderArgs } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { isAuthenticated } from '~/models/auth/auth.server'
import { getUsers } from '~/models/user.server'
export async function loader({ request }: LoaderArgs) {
  const user = await isAuthenticated(request)
  if (!user) {
    return { redirect: '/auth/login' }
  }

  const users = await getUsers()
  return json({ users })
}
