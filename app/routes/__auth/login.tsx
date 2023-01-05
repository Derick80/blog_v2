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
    <article className='flex min-h-screen flex-col items-center justify-center'>
      <div className='rounded-lg p-8 shadow-md'>
        <h1 className='text-2xl font-bold'>Login</h1>
        <AuthForm authType='login' />
        <div className='flex flex-col items-center justify-center'>
          <div>OR</div>
          continue with
        </div>

        <SocialLoginForm provider='github'>
          <button className=''>Github</button>
        </SocialLoginForm>
        <SocialLoginForm provider='discord'>
          <button className=''>Discord</button>
        </SocialLoginForm>
        <div className='flexflex-col mt-4 items-center justify-center'>
          <Link to='/register'>New to the site?? ..Register Here</Link>
        </div>
      </div>
    </article>
  )
}
