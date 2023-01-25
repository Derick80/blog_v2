import type { TravelLog } from '@prisma/client'
import type { LoaderArgs } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { useLoaderData, Outlet, Link } from '@remix-run/react'
import { ImageSlider } from '~/components/shared/carousel/image-slider'
import type { CitiesAndAlbums } from '~/utils/server/travel.server'
import { getAlbums } from '~/utils/server/travel.server'

export async function loader({ request, params }: LoaderArgs) {
  const albums = (await getAlbums()) as CitiesAndAlbums
  const byGroup = albums.reduce((acc, item) => {
    const { album, city, year } = item
    const key = `${album}`
    if (!acc[key]) {
      acc[key] = []
    }
    acc[key].push(item)
    return acc
  }, {} as Record<string, TravelLog[]>)

  const albumNames = albums
    .map((obj) => obj.album)
    .filter((v, i, a) => a.indexOf(v) === i)

  const [NYC, Japan] = Object.values(byGroup)

  if (!NYC) return redirect('/travel/new')
  if (!Japan) return redirect('/travel/new')
  // if(!photo) return redirect('/travel'    )
  return json({ NYC, Japan, albums, albumNames })
}

export default function Index() {
  const data = useLoaderData<typeof loader>()

  return (
    <>
      <div className='col-span-4 p-2 md:col-span-1 md:col-start-3 md:col-end-11'>
        {' '}
        <div className='flex items-center justify-around'>
          <Link to='/travel/new'>New</Link>
          {/* this is not quite working */}
          {data.albumNames.map((item, index) => {
            return (
              <a href={`/travel/#${item}`} key={index}>
                <h2>{item}</h2>
              </a>
            )
          })}
        </div>
        <ImageSlider data={data.NYC} />
        <ImageSlider data={data.Japan} />
        {/* <ImageSlider images={data.albums} /> */}
        {/* {data.albums.map((item, index) => {
          return (
            <div key={index}>
              <h2>{item.album}</h2>
              <h2>{item.city}</h2>
              <h2>{item.year}</h2>
              <h2>{item.imageTitle}</h2>
              <img
                src={item.imageUrl}
                alt='some text here'
                width='300'
                height='300'
              />
              <h2>{item.imageDescription}</h2>

            </div>
          )
        })} */}
      </div>

      <div></div>

      <Outlet />
    </>
  )
}
