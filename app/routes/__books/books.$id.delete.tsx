import type { ActionArgs, LoaderArgs } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { isAuthenticated } from '~/utils/server/auth/auth.server'
import { deleteBookReview } from '~/utils/server/book.server'
export async function loader({ request, params }: LoaderArgs) {
  throw new Response("This page doesn't exists.", { status: 404 })
}

export async function action({ request, params }: ActionArgs) {
  const { id } = params
  if (!id) {
    throw new Error('id is required')
  }
  const user = await isAuthenticated(request)
  if (!user) {
    throw new Error('Not Authenticated')
  }

  await deleteBookReview(id)

  return redirect('/books/')
}
