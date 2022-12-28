import { JapanImages } from '@prisma/client'
import type { LoaderArgs } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { Link, Outlet, useLoaderData } from '@remix-run/react'
import invariant from 'tiny-invariant'
import { ImageSlider } from '~/components/shared/image-slider'
import { isAuthenticated } from '~/models/auth/auth.server'
import { getJImageById, getJImages } from '~/models/j-images.server'

export async function loader({ request }: LoaderArgs) {
  const user = await isAuthenticated(request)
  if (!user) {
    return { redirect: '/auth/login' }
  }

  const images = await getJImages()
  if (!images) return redirect('/travel')
  return json({ images })
}

export default function Index() {
  const data = useLoaderData<typeof loader>()
  const allImages = data.images as JapanImages[]

  return (
    <div className='flex flex-row flex-wrap items-center justify-center'>
      <section className='flex flex-col items-center justify-center'>
        <h1 className='mh1'>Japan 2018</h1>

        <ImageSlider images={allImages} />
      </section>

      <div className='flex flex-col items-center justify-center'>
        <h1 className='mh1'>NYC 2022</h1>

        <ImageSlider images={allImages} />
      </div>
      <Outlet />
    </div>
  )
}
