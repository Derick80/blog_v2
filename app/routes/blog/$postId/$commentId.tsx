import { json, LoaderArgs } from '@remix-run/node'
import { prisma } from '~/utils/server/prisma.server'

export async function loader({ request, params }: LoaderArgs) {
  const id = params.id
  const childComments = await prisma.comment.findMany({
    where: {
      id: id
    }
  })

  return json({ childComments })
}
