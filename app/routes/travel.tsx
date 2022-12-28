import { Outlet, useLoaderData } from '@remix-run/react'

import type { LoaderArgs } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { isAuthenticated } from '~/models/auth/auth.server'
import { getJImages } from '~/models/j-images.server'
import type { JapanImages } from '@prisma/client'
import { ImageSlider } from '~/components/shared/image-slider'




export default function TravelRoute(){

  return (

    <>
    <h1>Travel
    <Outlet />
    </h1>
    </>
  )

}
