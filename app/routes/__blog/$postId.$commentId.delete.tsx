import type { ActionArgs, LoaderArgs } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { badRequest } from 'remix-utils'
import { prisma } from '~/utils/server/prisma.server'

export async function action({ request, params }: ActionArgs) {
  console.log(params, 'params');

  const commentId = params?.commentId
console.log(commentId, 'commentId');

  if (typeof commentId !== 'string')
    return badRequest({ message: 'Invalid commentId' })

  await prisma.comment.delete({
    where: {
        id: commentId,
    },
    })

  return redirect('/blog')
}

export async function loader({ request, params }: LoaderArgs) {
  throw new Response("This page doesn't exists.", { status: 404 })
}
