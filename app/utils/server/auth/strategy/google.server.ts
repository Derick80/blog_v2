import { Authenticator } from 'remix-auth'
import { GoogleStrategy } from 'remix-auth-google'
import { createUser } from '../../user.server'
import { authenticator } from '../auth.server'
import { sessionStorage } from '../session.server'
import { getAccount } from './accountService.server'

export const auth = new Authenticator(sessionStorage)

const clientId = process.env.GOOGLE_CLIENT_ID as string
if (!clientId) throw new Error('GOOGLE_CLIENT_ID is not defined')
const clientSecret = process.env.GOOGLE_CLIENT_SECRET as string
if (!clientSecret) throw new Error('GOOGLE_CLIENT_SECRET is not defined')

const googleCallbackUrl = process.env.GOOGLE_CALLBACK_URL as string
if (!googleCallbackUrl) throw new Error('GOOGLE_CALLBACK_URL is not defined')

export const googleStrategy = new GoogleStrategy(
  {
    clientID: clientId,
    clientSecret: clientSecret,
    callbackURL: googleCallbackUrl
  },
  async ({ accessToken, refreshToken, extraParams, profile }) => {
    const account = await getAccount({
      provider: profile.provider,
      providerAccountId: profile.id
    })

    if (account) return account.user.id

    const user = await createUser({
      email: profile.emails ? profile.emails[0].value : '',
      userName: profile.displayName,
        avatarUrl: profile.photos ? profile.photos[0].value : '',
      account: {
        provider: profile.provider,
        providerAccountId: profile.id,
        accessToken: accessToken
      }
    })

    return user.id
  }
)
