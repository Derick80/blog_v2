import { ChevronDownIcon, Cross2Icon, ExitIcon } from '@radix-ui/react-icons'
import { Form, Link } from '@remix-run/react'
import { motion } from 'framer-motion'
import React from 'react'
import { useOptionalUser } from '~/utils/utilities'
import StatsCard from '../blog-ui/stats-card'
import { MainLink, PersonalLinks, CareerLinks, AdminMenu } from './link-arrays'

export default function SideBar() {
  const user = useOptionalUser()


const [open, setOpen] = React.useState(false)
  const shifty = open ? 'translate-x-[]' : ' -translate-x-full'
  const buttonShift = open ? 'translate-x-[240px]' : ' translate-x-[]'



  console.log(buttonShift, 'buttonShift');

  return (
    <div>
      <button
        className={ `absolute right- top-0 z-50  delay-150 duration-300 ease-in-out peer-focus:left-0 rounded-full bg-crimson9 ${buttonShift}` }
        onClick={ () => setOpen(!open) }
      >
        { open ? <Cross2Icon /> : <ChevronDownIcon /> }
      </button>
    <div
      className={`absolute z-10 flex h-full w-[250px] flex-col overflow-scroll rounded-r-xl rounded-l-sm bg-crimson3 p-2 delay-150 duration-300 ease-out peer-focus:left-0 ${shifty}`}
    >


      <div className='relative'></div>
      <MainLink />
      <PersonalLinks />
      <CareerLinks />
      {user?.role === 'ADMIN' && <AdminMenu />}
      <StatsCard />

      {user ? (
        <Form method='post' action='/logout'>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            type='submit'
            className='btn-link flex items-center gap-2'
          >
            Logout
            <ExitIcon />
          </motion.button>
        </Form>
      ) : (
        <Link to='/login'>Login</Link>
      )}

    </div>

    </div>
  )
}
