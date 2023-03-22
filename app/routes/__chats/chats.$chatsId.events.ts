import { json, LoaderArgs } from '@remix-run/node'
import invariant from 'tiny-invariant'
import { isAuthenticated } from '~/utils/server/auth/auth.server'
import { EVENTS, chatEmitter } from '~/utils/server/chat.server'
import { eventStream } from '~/utils/server/event-stream.server'
import { prisma } from '~/utils/server/prisma.server'

export async function loader({ request, params }: LoaderArgs) {
  const currentUser = await isAuthenticated(request)
  invariant(currentUser, 'You must be logged in to access this page')
  const userId = currentUser.id
  const hasAccess = await prisma.chat.findFirst({
    where: {
      id: params.chatsId,
      users: {
        some: {
          id: userId
        }
      }
    },
    select: {
      id: true
    }
  })

  if (!hasAccess) {
    return new Response('Access Denied', { status: 403 })
  }
  return eventStream(request, (send) => {
    function handler(message: string) {
      send('message', message)
    }
    chatEmitter.addListener(EVENTS.NEW_MESSAGE, handler)
    return () => {
      chatEmitter.removeListener(EVENTS.NEW_MESSAGE, handler)
    }
  })
}

// export function unstable_shouldReload(){
//     // this should never reload
//     return false
// }
