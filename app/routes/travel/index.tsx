import type { LoaderArgs } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'
import { ImageSlider } from '~/components/shared/image-slider'
import { isAuthenticated } from '~/models/auth/auth.server'
import { getJImages } from '~/models/j-images.server'
import { getTravelLog } from '~/models/travel.server'

export async function loader({ request }: LoaderArgs) {
  const user = await isAuthenticated(request)

  const currentUser = user?.role

  const travelLog = await getTravelLog()

  const nyc = travelLog.filter((item) => item.album === 'NYC')

  const jp = travelLog.filter((item) => item.album === 'Japan')
const shinkjuku = jp.filter((item)=> item.city === 'Shinjuku')

  return json({ currentUser, jp, nyc, shinkjuku })
}

export default function Index() {
  const data = useLoaderData<typeof loader>()

  return (
    <>
       <div
       className='w-full'
       id="Japan"
       >
         <ImageSlider images={data.jp} />
       </div>

       <div className='w-full' id="Shinjuku">
       <ImageSlider images={data.shinkjuku} />
        </div>

        <ImageSlider images={data.jp} />

        <ImageSlider images={data.jp} />
        <div
       className='w-full'
       id="nyc"
       >
        <ImageSlider images={data.nyc} />
        </div>
        <Outlet />
        <div
        className='border-2 border-black'
        ></div>
    </>
  )
}
