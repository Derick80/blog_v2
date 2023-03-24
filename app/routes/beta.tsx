import { StarFilledIcon, StarIcon } from '@radix-ui/react-icons'
import { json } from '@remix-run/node'
import { Form, useLoaderData } from '@remix-run/react'
import React from 'react'
import { isAuthenticated } from '~/utils/server/auth/auth.server'

export async function loader({ request }: { request: Request }) {
  const user = await isAuthenticated(request)

  if (!user) {
    return json({ error: 'Not authenticated' }, { status: 401 })
  }

  return json({ user }, { status: 200 })
}

export default function BetaRoute() {
  const data = useLoaderData()
  const [open, setOpen] = React.useState(false)
  return (
    <div className='relative grid grid-cols-12 max-w-2xl mx-auto h-screen'>

        {/* <div
          className='hidden relative md:flex md:col-span-2 col-start-1 h-sfull bg-blue-500 w-full' > */}
{
  open && (
    <div className='absolute top-0 left-0 w-[250px] h-full bg-crimson8'>
      stuf headers
    </div>
  )
}
      <button className='absolute right-0 md:left-auto flex  text-crimson8'
        onClick={ () => setOpen(!open) }
      >
        <StarIcon />
      </button>
        {/* </div> */}
        <div className='col-span-12 md:col-span-12 flex col-stsart-3 w-fsull bg-purple-500 h-scrseen'>


        </div>
</div>
  )
}
