import { Button, Flex } from '@mantine/core'
import type { TravelLog } from '@prisma/client'
import type { LoaderArgs } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import {
  useLoaderData,
  Outlet,
  Link,
  isRouteErrorResponse,
  useRouteError
} from '@remix-run/react'
import { ImageSlider } from '~/components/shared/carousel/image-slider'
import type { CitiesAndAlbums } from '~/utils/server/travel.server'
import { getAlbums } from '~/utils/server/travel.server'
import { useOptionalUser } from '~/utils/utilities'

// or cloudflare/deno

export async function loader({ request, params }: LoaderArgs) {
  const albums = (await getAlbums()) as CitiesAndAlbums
  const byGroup = albums.reduce((acc, item) => {
    const { album } = item
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
  const user = useOptionalUser()

  return (
    <div className='flex grow flex-col items-center'>
      {user?.role === 'ADMIN' && (
        <Link to='/travel/new'>
          <Button color='teal' variant='outline'>
            Add a new photo
          </Button>
        </Link>
      )}

      <Flex direction='row' gap={20} align='center'>
        <Flex gap={5}>
          {data.albumNames.map((item, index) => {
            return (
              <Button key={index} color='blue' variant='outline'>
                <a href={`/travel/#${item}`}>
                  <h2>{item}</h2>
                </a>
              </Button>
            )
          })}
        </Flex>
      </Flex>
      <ImageSlider data={data.NYC} />
      <ImageSlider data={data.Japan} />

      <div></div>

      <Outlet />
    </div>
  )
}
export function ErrorBoundary() {
  const error = useRouteError()
  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>oops</h1>
        <h1>Status:{error.status}</h1>
        <p>{error.data.message}</p>
      </div>
    )
  }
  let errorMessage = 'unknown error'
  if (error instanceof Error) {
    errorMessage = error.message
  } else if (typeof error === 'string') {
    errorMessage = error
  }

  return (
    <div>
      <h1 className='text-2xl font-bold'>uh Oh..</h1>
      <p className='text-xl'>something went wrong</p>
      <pre>{errorMessage}</pre>
    </div>
  )
}
