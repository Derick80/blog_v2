import type { LoaderArgs, MetaFunction } from '@remix-run/node'
import { Link } from '@remix-run/react'
import { badRequest, serverError } from 'remix-utils'
import { AuthForm } from '~/components/shared/auth/auth-form'
import { SocialLoginForm } from '~/components/shared/auth/social-login-form'
import { authenticator, AuthorizationError } from '~/models/auth/auth.server'

export const meta: MetaFunction = () => {
  return {
    title: `Derick's Personal Blog | Register`,
    description: `Register to Derick's Personal Blog`
  }
}

export async function action({ request }: LoaderArgs) {
  try {
    return await authenticator.authenticate('register', request, {
      successRedirect: '/blog'
    })
  } catch (error) {
    if (error instanceof Response) return error
    if (error instanceof AuthorizationError)
      return badRequest({ message: error.message })
    return serverError(error)
  }
}

export default function Page() {
  return (
    <div>
      <AuthForm authType='register' />
      <SocialLoginForm>
        <div className='mt-4'>
          <Link to='/login'>Already have an Account?</Link>
        </div>
      </SocialLoginForm>
    </div>
  )
}
