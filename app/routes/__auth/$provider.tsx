// app/routes/auth/$provider.tsx
import { ActionArgs, redirect } from '@remix-run/node'
import { authenticator } from '~/models/auth/auth.server'

export let loader = () => redirect('/login')

export let action = ({ request, params }: ActionArgs) => {
  return authenticator.authenticate(params.provider, request)
}
