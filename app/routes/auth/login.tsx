import {
  ActionFunction,
  LoaderArgs,
  MetaFunction,
  redirect
} from '@remix-run/node'
import { Form, Link } from '@remix-run/react'
import { badRequest, serverError } from 'remix-utils'
import { AuthForm } from '~/components/shared/auth/auth-form'
import { SocialLoginForm } from '~/components/shared/auth/social-login-form'
import { isAuthenticated, authenticator } from '~/models/auth/auth.server'

export const meta: MetaFunction = () => {
  return {
    title: `Derick's Personal Blog | Login`,
    description: `Login to Derick's Personal Blog`
  }
}

type ActionData = {
  formError?: string
  fieldErrors?: {
    email: string | undefined
    password: string | undefined
    firstName?: string | undefined
    lastName?: string | undefined
  }
  fields?: {
    action: string
    email: string
    password: string
    firstName?: string
    lastName?: string
  }
}

export async function loader(args: LoaderArgs) {
  return (await isAuthenticated(args.request)) ? redirect('/') : null
}

export const action: ActionFunction = async ({ request }) => {
  try {
    return await authenticator.authenticate('login', request, {
      successRedirect: '/'
    })
  } catch (error) {
    if (error instanceof Response) return error
    if (error instanceof Error)
      return badRequest({ message: `${error.message} +login error` })
    return serverError(error)
  }
}
export default function Login() {
  return (
    <article>
      <div className='rounded-lg bg-white p-8 shadow-md'>
        <AuthForm authType='login' />
        <div className='bg-white'>Or continue with</div>

        <SocialLoginForm provider='github'>
          <button>Github</button>
        </SocialLoginForm>
        <div className='mt-4'>
          <Link to='/auth/register'>Don't have an account?</Link>
        </div>
      </div>
    </article>
  )
}
