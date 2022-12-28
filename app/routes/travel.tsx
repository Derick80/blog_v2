import { useLoaderData } from '@remix-run/react'

import type { LoaderArgs } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { isAuthenticated } from '~/models/auth/auth.server'
import { getJImages } from '~/models/j-images.server'
import { Carousel } from '~/components/shared/test-carousel'
export async function loader({ request }: LoaderArgs) {
  const user = await isAuthenticated(request)
  if (!user) {
    return { redirect: '/auth/login' }
  }

  const images = await getJImages()
  return json({images} )
}

export default function Index() {
  const data = useLoaderData<typeof loader>()
const allImages = data.images
console.log('allImages', allImages);
console.log('array', Array.isArray(data.images));


  return (
    <>
      <h1>Travel</h1>
      <p>Travel page</p>

  <Carousel images={allImages} key={allImages.id} />



    </>
  )
}
