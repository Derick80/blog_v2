import { Button } from '@mantine/core'
import { Form, useActionData, useSearchParams } from '@remix-run/react'
import { useEffect } from 'react'
import { useToast } from '../toaster'

type Props = {
  authType: 'register' | 'login' | 'request' | 'confirm'
}

const actionMap: Record<Props['authType'], { button: string; url: string }> = {
  register: {
    url: '/register',
    button: 'Sign up'
  },
  login: {
    url: '/login',
    button: 'Log in'
  },
  request: {
    url: '/request-password-reset',
    button: 'Request password reset'
  },
  confirm: {
    url: '/confirm-password-reset',
    button: 'Confirm password'
  }
}

export const AuthForm = ({ authType }: Props) => {
  const { toast } = useToast();

  const action = useActionData()
  const [searchParams] = useSearchParams()
  const { button, url } = actionMap[authType]

  const token = searchParams.get('token')
  const redirectTo = searchParams.get('redirectTo')

  useEffect(() => {
    if (action && action.message) {
      toast(action.message)
    }
  }, [action])

  return (
    <Form
      className='mx-auto flex w-full flex-col items-center justify-center'
      method='post'
      action={url}
    >
      <input type='hidden' name='redirectTo' value={redirectTo || '/'} />
      <input type='hidden' name='token' value={token || ''} />

      {authType !== 'confirm' && (
        <>
          <label className='text-zinc-900 dark:text-slate-200 text-sm'>
            Email
          </label>
          <input
            className='rounded-xl p-2'
            id='email'
            name='email'
            type='email'
            placeholder='youremail@mail.com'
          />
          <label>Username</label>
          <input
            className='rounded-xl p-2'
            id='username'
            name='username'
            type='text'
            placeholder='username'
          />
        </>
      )}
      {authType !== 'request' && (
        <>
          <label>Password</label>
          <input
            className='rounded-xl p-2'
            id='password'
            name='password'
            type='password'
            autoComplete='current-password'
            placeholder='********'
          />
        </>
      )}

      <Button
        variant='outline'
        color='blue'
        className='mt-5'
      type='submit'>
        {button}
      </Button>
    </Form>
  )
}
