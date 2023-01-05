// app/routes/auth/$provider.callback.tsx
import { LoaderArgs } from '@remix-run/node'
import { authenticator } from '~/models/auth/auth.server'

export let loader = ({ request, params }: LoaderArgs) => {
  return authenticator.authenticate(params.provider, request, {
    successRedirect: '/',
    failureRedirect: '/login'
  })
}
