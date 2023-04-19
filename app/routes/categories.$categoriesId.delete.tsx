import { ActionArgs, LoaderArgs, json } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { badRequest } from 'remix-utils'
import { isAuthenticated } from '~/utils/server/auth/auth.server'
import { prisma } from '~/utils/server/prisma.server'

export async function action({ request, params }: ActionArgs) {
  const categoryId = params?.categoriesId
  const user = await isAuthenticated(request)
  if (!user)
    return (
      await redirect('/login'),
      json({ message: 'You need to be authenticated to delete a category' })
    )

  if (typeof categoryId !== 'string')
    return badRequest({ message: 'Invalid categoryId' })

  await prisma.category.delete({
    where: {
      id: categoryId
    }
  })

  return redirect('/blog/categories')
}

export async function loader({ request, params }: LoaderArgs) {
  throw new Response("This page doesn't exists.", { status: 404 })
}
