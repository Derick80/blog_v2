import { DiscordLogoIcon, GitHubLogoIcon } from '@radix-ui/react-icons'
import type { ActionFunction, LoaderArgs, MetaFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { Link } from '@remix-run/react'
import { badRequest, serverError } from 'remix-utils'
import { AuthForm } from '~/components/shared/auth/auth-form'
import { SocialLoginForm } from '~/components/shared/auth/social-login-form'
import { isAuthenticated, authenticator } from '~/utils/server/auth/auth.server'
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
    <div className='flex flex-col w-full'>
      <AuthForm authType='login' />
      <div className='mb-2 mt-2 flex h-full flex-col items-center justify-center md:mb-5 md:mt-5'>
        <h3 className='text-sm italic'>OR</h3>
        <p className='text-sm italic'>Login with your social account</p>
      </div>
      <div className='flex items-center justify-center'>
        <SocialLoginForm provider='discord'>
          <button className='flex flex-col items-center gap-2'>
            <DiscordLogoIcon className='h-5 w-5' />
          </button>
        </SocialLoginForm>
        <SocialLoginForm provider='github'>
          <button className='flex flex-col items-center gap-2'>
            <GitHubLogoIcon className='h-5 w-5' />
          </button>
        </SocialLoginForm>
        <SocialLoginForm provider='google'>
          <button className='flex flex-col items-center gap-2'>Google</button>
        </SocialLoginForm>
      </div>

      <div className='mb-2 mt-2 flex flex-col items-center justify-center md:mb-5 md:mt-5'>
        <h3 className='text-sm italic'>OR</h3>

        <Link to='/register'>
          <p className='text-sm italic'>Register a new account</p>
        </Link>
      </div>
    </div>
  )
}
