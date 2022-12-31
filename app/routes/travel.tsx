import { LoaderArgs, json } from '@remix-run/node'
import { Link, Outlet, useLoaderData } from '@remix-run/react'
import { Key, ReactElement, JSXElementConstructor, ReactFragment } from 'react'
import invariant from 'tiny-invariant'
import { ImageSlider } from '~/components/shared/image-slider'
import { getAlbums } from '~/models/travel.server'
import { reduceTextArray } from '~/utils/functions.server'
export async function loader({ request }: LoaderArgs) {
  const albums = await getAlbums()
  const byGroup = albums.reduce((acc, item) => {
    const { album, city, year } = item
    const key = `${album}`
    if (!acc[key]) {
      acc[key] = []
    }
    acc[key].push(item)
    return acc
  }, {} as Record<string, typeof Image[]>)

  const [NYC, Japan] = Object.values(byGroup)

  // if(!photo) return redirect('/travel'    )
  return json({ byGroup })
}

export default function TravelRoute() {
  const data = useLoaderData<typeof loader>()
  return (
<>




      <Outlet />
    </>
  )
}


