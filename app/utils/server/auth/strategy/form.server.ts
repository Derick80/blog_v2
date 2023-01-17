import { FormStrategy } from 'remix-auth-form'
import invariant from 'tiny-invariant'

import bcrypt from 'bcryptjs'
import { AuthInput } from '~/utils/schemas/auth-schema'
import {
  createUser,
  getUser,
  getUserPasswordHash
} from '~/utils/server/user.server'

export const registerStrategy = new FormStrategy(async ({ form }) => {
  const email = form.get('email')
  const userName = form.get('username')
  const password = form.get('password')
  invariant(typeof email === 'string', 'Email is not a string')
  invariant(typeof userName === 'string', 'Username is not a string')

  const existingUser = await getUser({ email })
  if (existingUser) {
    throw new Error('User already exists')
  }
  const user = await createUser({ email, password, userName } as AuthInput)
  return user.id
})

export const loginStrategy = new FormStrategy(async ({ form }) => {
  const email = form.get('email')
  const password = form.get('password')

  invariant(typeof email === 'string', 'Email is not a string')
  invariant(typeof password === 'string', 'Password is not a string')
  const { user, passwordHash } = await getUserPasswordHash({ email })
  if (
    !user ||
    !passwordHash ||
    (passwordHash && !(await bcrypt.compare(password, passwordHash)))
  ) {
    throw new Error('Invalid email or password')
  }
  return user.id
})
