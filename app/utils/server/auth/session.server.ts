import type { Session } from '@remix-run/node'
import { createCookieSessionStorage } from '@remix-run/node'

// Create a session storage that uses cookies to store the session data.  This is the basic session storage setup that I used in my Auth server files.

const secret = process.env.SESSION_SECRET
if (!secret) {
  throw new Error('SESSION_SECRET is not set')
}

// revisit secure before production
const cookieOptions = {
  name: '_blog_session',
  httpOnly: true,
  sameSite: 'lax' as 'lax',
  path: '/',
  secrets: [secret],
  secure: false
}

export const sessionStorage = createCookieSessionStorage({
  cookie: cookieOptions
})

export const getSession = async (request: Request) => {
  const session = await sessionStorage.getSession(request.headers.get('Cookie'))

  return session
}

export const commitSession = async (session: Session) => {
  const headers = new Headers({
    'Set-Cookie': await sessionStorage.commitSession(session)
  })

  return headers
}
