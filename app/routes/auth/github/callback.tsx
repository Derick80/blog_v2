import type { LoaderFunction } from '@remix-run/node'
import { authenticator } from '~/models/auth/auth.server'

export const loader: LoaderFunction = async ({ request }) => {
  return await authenticator.authenticate('github', request, {
    successRedirect: '/',
    failureRedirect: '/auth/login'
  })
}
