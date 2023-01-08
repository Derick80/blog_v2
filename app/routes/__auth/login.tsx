import type { ActionFunction, LoaderArgs, MetaFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { Link } from '@remix-run/react'
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
    <div className='mx-auto mt-10 flex h-fit w-1/4 flex-col shadow-2xl md:mt-20'>
      <AuthForm authType='login' />
      <div className='mt-2 mb-2 flex h-full flex-col items-center justify-center md:mt-5 md:mb-5'>
        <h3 className='mh3'>OR</h3>
        <p className='text-sm italic'>Login with your social account</p>
      </div>
      <SocialLoginForm provider='discord'>
        <button className=''>Discord </button>
      </SocialLoginForm>
      <SocialLoginForm provider='github'>
        <button className=''>Github</button>
      </SocialLoginForm>

      <div className='mt-2 mb-2 flex flex-col items-center justify-center md:mt-5 md:mb-5'>
        <Link to='/register'>New to the site?? ..Register Here</Link>
      </div>
    </div>
  )
}
