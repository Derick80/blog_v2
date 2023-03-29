import Footer from './footer'
import React from 'react'
import {
  Cross2Icon,
  HamburgerMenuIcon
} from '@radix-ui/react-icons'
import SideBar from './sidebar'
import { NavLink } from '@remix-run/react'
import { BrandIcon } from '../icons'

export default function Layout({ children }: { children: React.ReactNode }) {
  const activeStyle = {
    textDecoration: 'underline'
  }
  const [sidebarOpen, setSidebarOpen] = React.useState(false)
  return (
    <>
      <div className='relative mx-auto mt-5 h-screen max-w-sm md:grid md:max-w-3xl md:grid-cols-12'>
        <nav className='col-span-12 mb-5 flex h-[25vh]  w-full flex-row items-center justify-between gap-2'>
          <div className='h-20 w-20'>
            <BrandIcon />
          </div>
          <div className='md:h4 h4 '>Derick Hoskinson PhD</div>
          <NavLink
            prefetch='intent'
            style={ ({ isActive }) => (isActive ? activeStyle : undefined) }
            aria-label='Go to Home'
            to='/'
            className='btn-navlink'
          >
            <h4 className='h4 font-semibold'>Home</h4>
          </NavLink>
          <NavLink
            prefetch='intent'
            style={ ({ isActive }) => (isActive ? activeStyle : undefined) }
            aria-label='Go to Blog'
            to='/blog'
            className='btn-navlink'
          >
            <h4 className='h4 font-semibold'>Blog</h4>
          </NavLink>
          <button onClick={ () => setSidebarOpen(!sidebarOpen) }>
            {
              sidebarOpen ? <Cross2Icon /> : <HamburgerMenuIcon />
            }
          </button>
          <SideBar
            status={ sidebarOpen }
          />
        </nav>

        <main className='relative col-span-10 flex h-full w-full flex-grow md:col-span-12'>


          {children}
        </main>

        <Footer />
      </div>
      {/* top-24 */}
    </>
  )
}
