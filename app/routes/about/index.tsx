import { json, LoaderArgs, MetaFunction, redirect } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import MyProfile from '~/components/shared/about-me'
import { getAbout } from '~/utils/server/about.server'
import { isAuthenticated } from '~/utils/server/auth/auth.server'

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
    <div className='mx-auto mt-2 h-fit rounded-2xl p-2 md:mt-5'>
      {data.about.map((about) => (
        <MyProfile key={about.id} about={about} />
      ))}
    </div>
  )
}
