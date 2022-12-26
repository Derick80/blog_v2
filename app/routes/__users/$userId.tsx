import { json, LoaderArgs } from '@remix-run/node'
import invariant from 'tiny-invariant'
import { getUserById } from '~/models/user.server'

export async function loader({ params, request }: LoaderArgs) {
  const userId = params.userId
  invariant(userId, 'userId is required')
  const users = await getUserById(userId)
  return json({ users })
}
