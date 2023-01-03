import { json, LoaderArgs, MetaFunction, redirect } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import MyProfile from '~/components/shared/profile'
import { getAbout } from '~/models/about.server'
import { isAuthenticated } from '~/models/auth/auth.server'

export const meta: MetaFunction = () => {
  return {
    title: `Derick's Personal Blog | About this Site`,
    description: `About Page`
  }
}

export async function loader({ request }: LoaderArgs) {
  const about = await getAbout()

  return json({ about })
}

export default function Page() {
  const data = useLoaderData<typeof loader>()
  return (
    <div className='pt5'>
      {data.about.map((about) => (
        <MyProfile key={about.id} about={about} />
      ))}
    </div>
  )
}
