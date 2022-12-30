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

  return json({ currentUser, jp, nyc })
}

export default function Index() {
  const data = useLoaderData<typeof loader>()

  return (
    <div className='flex flex-row items-center justify-around'>
      <div className='flex w-full flex-col items-center'>
        <h1 className='mh1'>Japan 2018</h1>

        {data.jp.length > 1 ? (
          <ImageSlider images={data.jp} />
        ) : (
          <div className='flex flex-col items-center justify-center'>
            {data.jp.map((item) => {
              return (
                <div key={item.id} className='flex flex-col items-center'>
                  <img
                    className='w-1/2'
                    width='100%'
                    height='100%'
                    src={item.imageUrl}
                    alt='Japan 2018'
                  />
                </div>
              )
            })}
          </div>
        )}
      </div>

      <div className='flex w-full flex-col items-center'>
        <h1 className='mh1'>NYC 2022</h1>

        <ImageSlider images={data.nyc} />
      </div>
      <Outlet />
    </div>
  )
}
