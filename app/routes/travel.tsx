import { LoaderArgs, json } from '@remix-run/node'
import { Link, Outlet, useLoaderData } from '@remix-run/react'
import { Key, ReactElement, JSXElementConstructor, ReactFragment } from 'react'
import invariant from 'tiny-invariant'
import { ImageSlider } from '~/components/shared/image-slider'
import { getAlbums } from '~/models/travel.server'
import { reduceTextArray } from '~/utils/functions.server'
import { PhotoMapProps } from './travel/$albumId'
export async function loader({ request }: LoaderArgs) {
  const citiesAndAlbums = await getAlbums()
  invariant(citiesAndAlbums, 'No cities found')

  const album = await citiesAndAlbums.reduce((acc, item) => {
   const index = acc.album.includes(item.album)

    if (!index) {
      acc.album.push(item.album)
    }
    return acc
  }, { album: [] as string[] })



const city = citiesAndAlbums.reduce((acc, curr)=> {
    if (!acc.includes(curr.city)) {
      acc.push(curr.city)
    }
    return acc
}, [] as string[])




  return json({ album, citiesAndAlbums })
}

export default function TravelRoute() {
  const data = useLoaderData<typeof loader>()
  return (
    <>
      <div className='mt-10 flex flex-row md:flex-row'>
<PhotoSideBar
          category={data.album.album}
        />


      </div>

<Outlet />
    </>
  )
}


function PhotoSideBar({ category,  }: { category: string[]  }) {
  return (
    <div className='flex flex-col'>
      {category.map((item) => (
       <Link to={`/travel/${item}`} key={item}>
          <div className='flex flex-col'>
            <h1 className='capitalize'>{item}</h1>
          </div>
        </Link>
      ))}
    </div>
  )
}