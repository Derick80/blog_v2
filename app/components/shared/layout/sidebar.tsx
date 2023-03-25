import { ExitIcon } from '@radix-ui/react-icons'
import { Form, Link } from '@remix-run/react'
import { motion } from 'framer-motion'
import { useOptionalUser } from '~/utils/utilities'
import StatsCard from '../blog-ui/stats-card'
import { MainLink, PersonalLinks, CareerLinks, AdminMenu } from './link-arrays'

export default function SideBar({ shift }: { shift: string }) {
  const user = useOptionalUser()

  return (
    <div
      className={`absolute z-20 flex h-full w-[250px] flex-col overflow-scroll rounded-r-xl rounded-l-sm bg-crimson3 p-2 delay-150 duration-300 ease-out peer-focus:left-0 ${shift}`}
    >
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
  )
}
