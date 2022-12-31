import { json, LoaderArgs } from '@remix-run/node'
import { useLoaderData, Outlet } from '@remix-run/react'
import { ImageSlider } from '~/components/shared/image-slider'
import { getAlbums } from '~/models/travel.server'



export async function loader({ request, params }: LoaderArgs) {
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
  return json({ NYC, Japan  })
}

export default function Index() {
    const data = useLoaderData<typeof loader>()

    return (
        <>
        <div className='h-screen w-full grow border-2 border-red-500'>
            <div className='grow'>
<div
>        <ImageSlider images={data.NYC} />
    </div>
<div
>        <ImageSlider images={data.Japan} />
    </div>
            </div>
        </div>

        <Outlet />
        </>
    )
    }
