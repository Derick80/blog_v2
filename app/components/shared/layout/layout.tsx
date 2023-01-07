import { Form } from '@remix-run/react'
import clsx from 'clsx'
import { useState } from 'react'
import {
  adminLinks,
  nonUserLinks,
  siteLinks,
  userLinks
} from '~/utils/schemas/constants/links'
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
      <main className='flex grow flex-col justify-items-center'>
        {children}
      </main>

      <Footer>
        <ul className='text-zinc-900 dark:text-slate-100 flex flex-row items-center justify-center space-x-3 text-sm'>
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
              {/* <svg
                className='fill-black text-base dark:fill-white'
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                aria-label='LinkedIn'
              >
                <path d='M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' />
              </svg> */}
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

function SiteActions() {
  const user = useOptionalUser()

  return (
    <ul className='hidden items-center justify-end space-x-5 md:flex'>
      {user ? (
        <>
          <li className='flex flex-col items-center'>
            <div className='text-zinc-900 dark:text-slate-100 text-2xl font-bold'>
              Welcome
            </div>{' '}
            <p className='text-zinc-900 dark:text-slate-100 text-xl italic'>
              {user.userName}
            </p>
          </li>
          <li>
            <ColorMode />
          </li>
          <li className='noscript-hidden lg:block'></li>

          <li className='flex items-center'>
            <Form method='post' action='/logout'>
              <button
                className='btn-base flex flex-col items-center'
                type='submit'
              >
                <ExitIcon />
              </button>
            </Form>
          </li>
        </>
      ) : (
        <>
          <li>
            <ColorMode />
          </li>
          {nonUserLinks.map((link, index) => (
            <LinkMaker key={index} link={link} />
          ))}
        </>
      )}
    </ul>
  )
}
