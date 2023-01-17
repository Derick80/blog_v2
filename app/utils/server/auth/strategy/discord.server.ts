// app/auth.server.ts
import { User } from '@prisma/client'
import { Authenticator } from 'remix-auth'
import type { DiscordProfile, PartialDiscordGuild } from 'remix-auth-discord'
import { DiscordStrategy } from 'remix-auth-discord'
import { sessionStorage } from '../session.server'
import { AuthInput } from '~/utils/schemas/auth-schema'
import { getAccount } from './accountService.server'
import { createUser } from '~/utils/server/user.server'

export interface DiscordUser {
  id: DiscordProfile['id']
  userName: DiscordProfile['displayName']
  avatarUrl: DiscordProfile['__json']['avatar']
  email: DiscordProfile['__json']['email']
  accessToken: string
  refreshToken: string
}

export const auth = new Authenticator(sessionStorage)

const clientID = process.env.DISCORD_CLIENT_ID as string
if (!clientID) throw new Error('DISCORD_CLIENT_ID is not defined')
const clientSecret = process.env.DISCORD_CLIENT_SECRET as string
if (!clientSecret) throw new Error('DISCORD_CLIENT_SECRET is not defined')

export const discordStrategy = new DiscordStrategy(
  {
    clientID: clientID,
    clientSecret: clientSecret,
    callbackURL: 'http://localhost:5832/discord/callback',
    // Provide all the scopes you want as an array
    scope: ['identify', 'email']
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
      account: {
        provider: profile.provider,
        providerAccountId: profile.id,
        accessToken: accessToken
      }
    })

    return user.id
  }
)
