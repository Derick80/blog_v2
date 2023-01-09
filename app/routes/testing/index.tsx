import { Outlet } from '@remix-run/react'

export default function Index() {
  return (
    <div>
      <h1>Index</h1>
      <Outlet />
    </div>
  )
}
