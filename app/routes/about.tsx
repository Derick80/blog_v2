import type { LoaderArgs, MetaFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import MyProfile from '~/components/shared/about-me'
import { getAbout } from '~/utils/server/about.server'
import { useOptionalUser } from '~/utils/utilities'

export const meta: MetaFunction = () => {
  return {
    title: `Derick's Personal Blog | About this Site`,
    description: `Read all about me and this site`
  }
}

export async function loader({ request }: LoaderArgs) {
  const about = await getAbout()

  return json({ about })
}

export default function Page() {
  const data = useLoaderData<typeof loader>()



  return (
    <>
      {data.about.map((about) => (
        <MyProfile key={about.id} about={about} />
      ))}
    </>
  )
}
