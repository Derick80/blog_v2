import { useOptionalUser } from '~/utils/utilities'
import Footer from './footer'
import React from 'react'
import { ChevronDownIcon, ChevronLeftIcon } from '@radix-ui/react-icons'
import TopNav from './top-nav'
import SideBar from './sidebar'

export default function Layout({ children }: { children: React.ReactNode }) {
  const user = useOptionalUser()

  const [open, setOpen] = React.useState(false)
  const shift = open ? 'translate-x-[]' : ' -translate-x-full'

  return (
    <>
      <div className='relsative mx-auto mt-5 h-screen max-w-sm md:grid md:max-w-2xl md:grid-cols-12'>
        <TopNav />

        <main className='relative col-span-10 flex h-full w-full flex-grow  overflow-scroll md:col-span-12'>
          <SideBar shift={shift} />
          <button
            className={`absolute right-1 top-0 z-10 rounded-full bg-crimson8 `}
            onClick={() => setOpen(!open)}
          >
            {open ? <ChevronLeftIcon /> : <ChevronDownIcon />}
          </button>
          {children}
        </main>

        <Footer />
      </div>
      {/* top-24 */}
    </>
  )
}
