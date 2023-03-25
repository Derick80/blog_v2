import { useOptionalUser } from '~/utils/utilities'
import Footer from './footer'
import React from 'react'
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  Cross2Icon,
  ExitIcon
} from '@radix-ui/react-icons'
import TopNav from './top-nav'
import SideBar from './sidebar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className='relative mx-auto mt-5 h-screen max-w-sm md:grid md:max-w-2xl md:grid-cols-12'>
        <TopNav />

        <main className='relative col-span-10 flex h-full w-full flex-grow  overflow-scroll md:col-span-12'>
          <SideBar />
          {/* <button
            className={`absolute top-0 z-50  delay-150 duration-300 ease-in-out peer-focus:left-0 rounded-full bg-crimson8  ${buttonShift}`}
            onClick={() => setOpen(!open)}
          >
            {open ? <Cross2Icon /> : <ChevronDownIcon />}
          </button> */}
          {children}
        </main>

        <Footer />
      </div>
      {/* top-24 */}
    </>
  )
}
