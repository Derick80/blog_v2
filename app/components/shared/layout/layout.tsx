import Footer from './footer'
import React from 'react'
import {
  Cross2Icon,
  HamburgerMenuIcon
} from '@radix-ui/react-icons'
import SideBar from './sidebar'
import { NavLink } from '@remix-run/react'
import { BrandIcon } from '../icons'
import { socialLinks } from '~/utils/constants/social-links'

export default function Layout({ children }: { children: React.ReactNode }) {
  const activeStyle = {
    textDecoration: 'underline'
  }
  const [sidebarOpen, setSidebarOpen] = React.useState(false)
  return (
    <>
      <div className='relative mx-auto mt-5 h-full max-w-sm md:grid md:max-w-3xl md:grid-cols-12'>
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

        <footer className='absolute bottom-0 col-span-12 row-start-3 mt-5 flex w-full items-center justify-center gap-5'>
          <p className='p'>Copyrite { new Date().getFullYear() }</p>
          {/* map through social links array  */ }
          { socialLinks.map((social) => (
            <a
              key={ social.name }
              href={ social.href }
              target='_blank'
              rel='noopener noreferrer'
            >
              { social.icon }
            </a>
          )) }
        </footer>
      </div>
      {/* top-24 */}
    </>
  )
}
