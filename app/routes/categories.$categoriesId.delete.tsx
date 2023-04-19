import type { ActionArgs, LoaderArgs } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { badRequest } from 'remix-utils'
import { prisma } from '~/utils/server/prisma.server'

export async function action({ request, params }: ActionArgs) {
  const categoryId = params?.categoriesId

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
