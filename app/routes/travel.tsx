import { Outlet } from '@remix-run/react'

export default function TravelRoute() {
  return (
    <>
      <h1>
        Travel
        <Outlet />
      </h1>
    </>
  )
}
