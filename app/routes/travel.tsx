import { useLoaderData } from '@remix-run/react'

import type { LoaderArgs } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { isAuthenticated } from '~/models/auth/auth.server'
import { getJImages } from '~/models/j-images.server'
import { Carousel } from '~/components/shared/test-carousel'
import { JapanImages } from '@prisma/client'
import { Carousel2 } from '~/components/shared/test-car'
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
  console.log('array', Array.isArray(data.images))

  return (
    <>
      {/* <Carousel images={allImages} /> */}
      <Carousel2 images={allImages} />
    </>
  )
}
