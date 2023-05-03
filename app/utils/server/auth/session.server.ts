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
export const { commitSession, getSession } = createCookieSessionStorage({
  cookie: cookieOptions
})

export const sessionStorage = createCookieSessionStorage({
  cookie: cookieOptions
})

// Flash
type Flash = {
  type?: 'default' | 'success' | 'error'
  message?: string
}

const flashKey = 'flashMessage'

export const flash = async (
  session: Session,
  message: string,
  type: Flash['type'] = 'default'
) => {
  session.flash(flashKey, JSON.stringify({ type, message }))

  return session
}

export const flashAndCommit = async (
  request: Request,
  message: string,
  type: Flash['type'] = 'default'
) => {
  const session = await getSession(request)
  await flash(session, message, type)
  const headers = await commitSession(session)
  return headers
}

export const getFlash = async (request: Request) => {
  const session = await getSession(request)
  const flash: Flash = JSON.parse(session.get(flashKey) || '{}')
  const headers = await commitSession(session)

  return { ...flash, headers }
}
export type ToastMessage = { message: string; type: 'success' | 'error' }

export function setSuccessMessage(session: Session, message: string) {
  session.flash('toastMessage', { message, type: 'success' } as ToastMessage)
}

export function setErrorMessage(session: Session, message: string) {
  session.flash('toastMessage', { message, type: 'error' } as ToastMessage)
}
