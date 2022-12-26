import { Form, useActionData, useSearchParams } from '@remix-run/react'
import { useTransition } from 'react'

type Props = {
  authType: 'register' | 'login' | 'request' | 'confirm'
}

const actionMap: Record<Props['authType'], { button: string; url: string }> = {
  register: {
    url: '/auth/register',
    button: 'Sign up'
  },
  login: {
    url: '/auth/login',
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
  const transition = useTransition()
  const action = useActionData()
  const [searchParams] = useSearchParams()
  const { button, url } = actionMap[authType]

  const token = searchParams.get('token')
  const redirectTo = searchParams.get('redirectTo')

  // useEffect(() => {
  //   if (action && action.message) {
  //     alert(action.message)
  //   }
  // }, [action])

  return (
    <Form className='flex flex-col gap-5' method='post' action={url}>
      <input type='hidden' name='redirectTo' value={redirectTo || '/'} />
      <input type='hidden' name='token' value={token || ''} />

      {authType !== 'confirm' && (
        <>
        <label>Email</label>
          <input
            id='email'
            name='email'
            type='email'
            placeholder='youremail@mail.com'
          />
          <label>
            Username
          </label>
          <input
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
            id='password'
            name='password'
            type='password'
            autoComplete='current-password'
            placeholder='********'
          />
        </>

      )}

      <button className='mt-2 w-full' type='submit'>
        {button}
      </button>
    </Form>
  )
}
