import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, Cross1Icon, StarFilledIcon, StarIcon } from '@radix-ui/react-icons'
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


{
  open && (
    <div className='absolute w-[250px] h-full bg-crimson8'>
     <button className={ `absolute right-0 z-10 p-2 rounded-full bg-crimson8` }
        onClick={ () => setOpen(!open) }
      >
        <Cross1Icon />
      </button>
    </div>
  )
}
      <button className={ `absolute right-0 z-10 p-2 rounded-full bg-crimson8` }
        onClick={ () => setOpen(!open) }
      >
        {
          open ? <ChevronLeftIcon /> : <ChevronDownIcon />
        }
      </button>
        <div className='col-span-12 md:col-span-12 flex col-stsart-3 w-fsull bg-purple-500 h-scrseen'>


        </div>
</div>
  )
}
