import type { User } from '@prisma/client'
import { Authenticator, AuthorizationError } from 'remix-auth'
import { getSession, sessionStorage } from './session.server'
import { loginStrategy, registerStrategy } from './strategy/form.server'
import type { Session } from '@remix-run/node'

import { getUser } from '../user.server'
import { discordStrategy } from './strategy/discord.server'
import { googleStrategy } from './strategy/google.server'

export const authenticator = new Authenticator<User['id']>(sessionStorage, {
  throwOnError: true
})

authenticator.use(registerStrategy, 'register')
authenticator.use(loginStrategy, 'login')

authenticator.use(discordStrategy, 'discord')
authenticator.use(googleStrategy, 'google')
export const isAuthenticated = async (request: Request) => {
  const userId = await authenticator.isAuthenticated(request)
  if (!userId) return null
  return getUser({ id: userId })
}

export const setUserSession = async (session: Session, userId: User['id']) => {
  session.set(authenticator.sessionKey, userId)
  return session
}

export const setUserSessionAndCommit = async (
  request: Request,
  userId: User['id']
) => {
  const session = await getSession(request)
  await setUserSession(session, userId)
  const headers = new Headers({
    'Set-Cookie': await sessionStorage.commitSession(session)
  })
  return headers
}

export { AuthorizationError }
