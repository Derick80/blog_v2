import { Divider } from '@mantine/core'
import type {
  CVExperience,
  Education,
  Publication,
  Skill
} from '@prisma/client'
import { CheckCircledIcon } from '@radix-ui/react-icons'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { format } from 'date-fns'
import type { CV } from '~/utils/schemas/cv-schema'
import { isAuthenticated } from '~/utils/server/auth/auth.server'
import { prisma } from '~/utils/server/prisma.server'

export async function loader({ request }: { request: Request }) {
  const user = await isAuthenticated(request)

  if (!user) {
    return json({ error: 'Not authenticated' }, { status: 401 })
  }

  return json({ user }, { status: 200 })
}

export default function BetaRoute() {
  const data = useLoaderData()

  return (
    <div className='flex w-[350px] flex-col items-center p-2 md:w-full'></div>
  )
}
