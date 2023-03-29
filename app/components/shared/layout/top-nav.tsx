import { NavLink } from '@remix-run/react'
import { BrandIcon } from '../icons'

export default function TopNav() {
  const activeStyle = {
    textDecoration: 'underline'
  }

  return (
    <nav className='col-span-12 mb-5 flex h-[25vh]  w-full flex-row items-center justify-between gap-2'>
      <div className='h-20 w-20'>
        <BrandIcon />
      </div>
      <div className='md:h4 h4 '>
        Derick Hoskinson PhD
      </div>
      <NavLink
        prefetch='intent'
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
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
    </nav>
  )
}
