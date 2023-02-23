import { Flex } from '@mantine/core'
import type { LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { isAuthenticated } from '~/utils/server/auth/auth.server'
export async function loader({ request }: LoaderArgs) {
  const user = await isAuthenticated(request)

  return json({ user })
}

export default function Index() {
  const data = useLoaderData<typeof loader>()

  return (
    <Flex direction={'column'} gap={5} align='center'>
      <div>{}</div>
    </Flex>
  )
}
