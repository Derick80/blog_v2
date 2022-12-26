import { Form } from '@remix-run/react'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import { useState } from 'react'
import {
  nonUserLinks,
  siteLinks,
  userLinks
} from '~/utils/schemas/constants/links'
import { Theme, Themed, useTheme } from '~/utils/theme-provider'
import { useOptionalUser } from '~/utils/utils'
import { BrandIcon, MoonIcon, SunIcon } from '../icons'
import LinkMaker from '../link-maker'
import Footer from './footer'
import NavBar from './nav-bar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar>
        <div className='flex w-full flex-row items-center p-2'>
          <div className='flex h-24 w-24 items-center rounded md:h-24 md:w-24'>
            <BrandIcon />
          </div>
          <h1>Derick C. Hoskinson PhD</h1>
        </div>
        <NavLinks />
        <SiteActions />
      </NavBar>
      <main className='grow'>{children}</main>
      <Footer>Footer</Footer>
    </>
  )
}

function NavLinks() {
  const [isActive, setIsActive] = useState(false)
  const toggle = () => setIsActive(!isActive)
  const user = useOptionalUser()

  return (
    <nav className='hidden basis-1/2 items-center justify-center md:flex '>
      <ul className='flex space-x-5'>
        {user ? (
          <>
            {userLinks.map((link, index) => (
              <LinkMaker key={index} link={link} toggle={toggle} />
            ))}
            <p>Welcome {user.userName}</p>
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

const iconTransformOrigin = { transformOrigin: '50% 100px' }

function DarkModeToggle({
  variant = 'icon'
}: {
  variant?: 'icon' | 'labelled'
}) {
  const [, setTheme] = useTheme()
  return (
    <>
      <button
        onClick={() =>
          setTheme((prevTheme) =>
            prevTheme === Theme.DARK ? Theme.LIGHT : Theme.DARK
          )
        }
        className={clsx(
          'hover:border-primary focus:border-primary inline-flex h-14 items-center justify-center overflow-hidden rounded-full border-2 border-black p-1 transition focus:outline-none dark:border-white',
          {
            'w-14': variant === 'icon',
            'px-8': variant === 'labelled'
          }
        )}
      >
        {/* note that the duration is longer then the one on body, controlling the bg-color */}
        <div className='relative h-8 w-8'>
          <span
            className='absolute inset-0 rotate-90 transform text-black transition duration-1000 motion-reduce:duration-[0s] dark:rotate-0 dark:text-sky-400'
            style={iconTransformOrigin}
          >
            <MoonIcon />
          </span>
          <span
            className='absolute inset-0 rotate-0 transform text-yellow-400 transition duration-1000 motion-reduce:duration-[0s] dark:-rotate-90 dark:text-white'
            style={iconTransformOrigin}
          >
            <SunIcon />
          </span>
        </div>
        <span
          className={clsx('ml-4 text-black dark:text-white', {
            'sr-only': variant === 'icon'
          })}
        >
          {' '}
          <Themed dark='switch to light mode' light='switch to dark mode' />
        </span>
      </button>
    </>
  )
}

function SiteActions() {
  const user = useOptionalUser()

  return (
    <ul className='hidden basis-1/4 items-center justify-end space-x-5 md:flex'>
      {user ? (
        <>
          <div className='noscript-hidden lg:block'>
            <DarkModeToggle />
          </div>
          <LinkMaker
            link={{
              name: 'Preferences',
              href: '/preferences',
              icon_name: 'account_circle'
            }}
          />
          <li className='flex items-center'>
            <Form method='post' action='actions/logout'>
              <button className='btn btn-primary flex flex-col' type='submit'>
                <span className='material-symbols-outlined'>logout</span>
                Logout
              </button>
            </Form>
          </li>
        </>
      ) : (
        <>
          <DarkModeToggle />
          {nonUserLinks.map((link, index) => (
            <LinkMaker key={index} link={link} />
          ))}
        </>
      )}
    </ul>
  )
}
