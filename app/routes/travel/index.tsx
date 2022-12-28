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
      <>
        {/* <Carousel images={allImages} /> */}
        <ImageSlider images={allImages} />
        <Outlet />
      </>
    )
  }

