import type {
  LoaderFunction,
  ActionFunction,
  ActionArgs
} from '@remix-run/node'
import { notFound } from 'remix-utils'
import { authenticator } from '~/models/auth/auth.server'


export const loader: LoaderFunction = () => {
  throw notFound({ message: "This page doesn't exists." })
}

export const action: ActionFunction = async ({ request }: ActionArgs) => {
  return authenticator.authenticate('github', request)
}
