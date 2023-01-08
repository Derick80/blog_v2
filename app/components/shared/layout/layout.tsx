import { Form } from '@remix-run/react'
import clsx from 'clsx'
import { useState } from 'react'
import {
  adminLinks,
  nonUserLinks,
  siteLinks,
  userLinks
} from '~/utils/constants/links'
import { useOptionalUser } from '~/utils/utils'
import ColorMode from './color-mode'
import { BrandIcon } from '../icons'
import LinkMaker from './link-maker'
import Footer from './footer'
import NavBar from './nav-bar'
import AdminMaker from './admin-maker'
import {
  ExitIcon,
  GitHubLogoIcon,
  LinkedInLogoIcon
} from '@radix-ui/react-icons'

export default function Layout({ children }: { children: React.ReactNode }) {
  const user = useOptionalUser()
  return (
    <>
      <NavBar>
        <div className='flex flex-row items-center p-2'>
          <div className='flex h-24 w-24 items-center rounded md:h-24 md:w-24'>
            <BrandIcon />
          </div>

          <h1 className='text-zinc-900 dark:text-slate-100 text-2xl font-bold md:text-3xl'>
            Derick C. Hoskinson PhD
          </h1>
        </div>
        <NavLinks />
        {!user && <AdminMaker array={nonUserLinks} />}
      </NavBar>
      {user?.role === 'ADMIN' && (
        <div className='fixed bottom-0 right-5 md:right-5'>
          <AdminMaker array={adminLinks} />
        </div>
      )}
      <main className='flex-1'>{children}</main>

      <Footer>
        <ul className='border-bg-crimson6 border-1 flex flex-row items-center justify-center space-x-3 text-sm'>
          <li>
            <a
              href='https://www.github.com/Derick80'
              className='social'
              aria-label='GitHub'
            >
              <GitHubLogoIcon />
            </a>
          </li>
          <li>
            <p className='mr-4'> copyright &copy; {new Date().getFullYear()}</p>
          </li>
          <li>
            <a
              href='https://www.linkedin.com/in/dhoskinson'
              className='social'
              target='_blank'
              rel='noopener noreferrer'
              aria-label='LinkedIn'
            >
              <LinkedInLogoIcon />
            </a>
          </li>
          <li>{/* add more socials */}</li>
        </ul>
      </Footer>
    </>
  )
}

function NavLinks() {
  const [isActive, setIsActive] = useState(false)
  const toggle = () => setIsActive(!isActive)
  const user = useOptionalUser()

  return (
    <nav className='flex p-2 md:p-4'>
      <ul className='flex space-x-5'>
        {user ? (
          <>
            {siteLinks.map((link, index) => (
              <LinkMaker key={index} link={link} toggle={toggle} />
            ))}

            {userLinks.map((link, index) => (
              <LinkMaker key={index} link={link} toggle={toggle} />
            ))}
          </>
        ) : (
          <>
            {siteLinks.map((link, index) => (
              <LinkMaker key={index} link={link} toggle={toggle} />
            ))}
          </>
        )}
      </ul>
    </nav>
  )
}
