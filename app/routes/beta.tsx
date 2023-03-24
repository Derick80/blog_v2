import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, Cross1Icon, StarFilledIcon, StarIcon } from '@radix-ui/react-icons'
import { json } from '@remix-run/node'
import { Form, useLoaderData } from '@remix-run/react'
import React from 'react'
import BlogNav from '~/components/shared/blog-ui/blog-admin-menu'
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
const shift = open ? 'translate-x-[]' : '-translate-x-full'
  return (
    <div className='overflow-hidden relative grid grid-cols-12 max-w-2xl mx-auto h-screen'>



      <div className={`overflow-hidden peer-focus:left-0 ease-out delay-150 duration-300 flex flex-col absolute w-[250px] h-full bg-crimson8 ${shift}`}>

     <BlogNav />
            <button className={ `absolute right-0 z-10 p-2 rounded-full bg-crimson8` }
              onClick={ () => setOpen(!open) }
            >
              <Cross1Icon />
            </button>
      </div>

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

function Sidebar({children}:{
  children: React.ReactNode
}){

  return(
    <div className='-translate-x-full transition-all ease-in-out duration-1000  flex flex-col absolute w-[250px] h-full bg-crimson8'>

      {children}
    </div>
  )
}
