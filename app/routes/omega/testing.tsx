import type { LoaderArgs } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { useLoaderData, Outlet } from '@remix-run/react'
import Dropdown from '~/components/shared/blog-ui/dropdown'
import { isAuthenticated } from '~/utils/server/auth/auth.server'
import { Image, Text, Title } from '@mantine/core';
import { Carousel } from '@mantine/carousel'
import { TravelLog } from '@prisma/client'
import { getAlbums, CitiesAndAlbums } from '~/utils/server/travel.server'
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
  const slides = data.albums.map((album) => (
    <Carousel.Slide key={album.id}>
     <Title order={3}>{album.imageTitle}</Title>
      <Title order={4}
      italic
      >{album.imageDescription}</Title>
      <Title order={5}

      >{album.album}</Title>

      <Image src={album.imageUrl} />
    </Carousel.Slide>
  ));
  return (
<div className='col-span-4 p-2 md:col-span-1 md:col-start-3 md:col-end-11'>
<Carousel  slideSize="70%" height={200} slideGap="md" mx="auto" withIndicators>

      {slides}
    </Carousel>
    </div>
  )
}
