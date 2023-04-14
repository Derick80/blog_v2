import type { ActionArgs, LoaderArgs } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { badRequest } from 'remix-utils'
import { prisma } from '~/utils/server/prisma.server'
import type { MetaFunction } from '@remix-run/node' // or cloudflare/deno

export const meta: MetaFunction = () => {
  return {
    title: 'Delete a category',
    description: "Delete a category on Derick's blog"
  }
}
export async function action({ request, params }: ActionArgs) {
  console.log(params, 'params')

  const categoryId = params?.categoriesId
  console.log(categoryId, 'categoryId')

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
