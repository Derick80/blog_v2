import { Form } from '@remix-run/react'
import clsx from 'clsx'
import { useState } from 'react'
import {
  nonUserLinks,
  siteLinks,
  userLinks
} from '~/utils/schemas/constants/links'
import { Theme, Themed, useTheme } from '~/utils/theme-provider'
import { useOptionalUser, useUser } from '~/utils/utils'
import ColorMode from './color-mode'
import { BrandIcon, MoonIcon, SunIcon, Twitter } from '../icons'
import LinkMaker from './link-maker'
import Footer from './footer'
import NavBar from './nav-bar'
import AdminMaker from './admin-maker'

export default function Layout({ children }: { children: React.ReactNode }) {
  const user = useOptionalUser()
  return (
    <>
      <NavBar>
        <div className='flex flex-row items-center p-2'>
          <div className='flex h-24 w-24 items-center rounded md:h-24 md:w-24'>
            <BrandIcon />
          </div>

          <h1 className='text-2xl font-bold text-zinc-900 dark:text-slate-100 md:text-3xl'>
            Derick C. Hoskinson PhD
          </h1>
        </div>
        <NavLinks />
        <SiteActions />
      </NavBar>
      {user?.role === 'ADMIN' && (
        <div className='fixed bottom-0 right-5 md:right-5'>
          <AdminMaker />
        </div>
      )}
      <main className='flex grow flex-col justify-items-center'>
        {children}
      </main>

      <Footer>
        <ul className='flex flex-row items-center justify-center space-x-3 text-sm text-zinc-900 dark:text-slate-100'>
          <li>
            <a
              href='https://www.github.com/Derick80'
              className='social'
              aria-label='GitHub'
            >
              <svg
                className='fill-black text-base dark:fill-white'
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                aria-label='GitHub'
              >
                <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
              </svg>
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
              <svg
                className='fill-black text-base dark:fill-white'
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                aria-label='LinkedIn'
              >
                <path d='M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' />
              </svg>
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
            <div className='text-2xl font-bold text-zinc-900 dark:text-slate-100'>
              Welcome
            </div>{' '}
            <p className='text-xl italic text-zinc-900 dark:text-slate-100'>
              {user.userName}
            </p>
          </li>
          <li>
            <ColorMode />
          </li>
          <li className='noscript-hidden lg:block'></li>

          <LinkMaker
            link={{
              name: 'Preferences',
              href: '/preferences',
              icon_name: 'account_circle'
            }}
          />

          <li className='flex items-center'>
            <Form method='post' action='/logout'>
              <button
                className='btn-base flex flex-col items-center'
                type='submit'
              >
                <span className='material-symbols-outlined'>logout</span>
                Logout
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
