import { json } from '@remix-run/node'
import { badRequest } from 'remix-utils'
import { prisma } from '~/utils/server/prisma.server'
import type { MetaFunction, ActionArgs, LoaderArgs } from '@remix-run/node' // or cloudflare/deno

export const meta: MetaFunction = () => {
  return {
    title: 'Delete comment',
    description: "Delete a comment on Derick's blog"
  }
}
export async function action({ request, params }: ActionArgs) {
  const commentId = params?.commentId

  if (typeof commentId !== 'string')
    return badRequest({ message: 'Invalid commentId' })

  await prisma.comment.delete({
    where: {
      id: commentId
    }
  })

  return json({ message: 'comment deleted' })
}

export async function loader({ request, params }: LoaderArgs) {
  throw new Response("This page doesn't exists.", { status: 404 })
}
