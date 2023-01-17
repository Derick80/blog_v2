import { Form } from '@remix-run/react'
import { useState } from 'react'
import {
  adminLinks,
  nonUserLinks,
  siteLinks,
  userLinks
} from '~/utils/constants/links'
import { useOptionalUser } from '~/utils/utilities'
import ColorMode from './color-mode'
import { BrandIcon } from '../icons'
import LinkMaker from './link-maker'
import NavBar from './nav-bar'
import AdminMaker from './admin-maker'
import {
  ExitIcon,
  GitHubLogoIcon,
  LinkedInLogoIcon
} from '@radix-ui/react-icons'
import { Box, Navbar, Footer } from '@mantine/core'

export default function Layout({ children }: { children: React.ReactNode }) {
  const user = useOptionalUser()
  return (
    <>
      <Navbar
        sx={{
          display: 'flex',
          flexDirection: 'row',
          height: '100%',
          gap: '1rem'
        }}
      >
        <Navbar.Section mt='xs'>
          <p>1</p>
        </Navbar.Section>
        <Navbar.Section grow mt='md'>
          <NavLinks />
        </Navbar.Section>
        <Navbar.Section mt='xs'>
          <p>3</p>
        </Navbar.Section>
      </Navbar>
      {/* <NavBar>
       <Box
          sx={()=> ({
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',

          })}
        >
          <div className='flex h-24 w-24 items-center rounded md:h-24 md:w-24'>

          </div>

          <h1 className='text-zinc-900 dark:text-slate-100 text-2xl font-bold md:text-3xl'>
            Derick C. Hoskinson PhD
          </h1>
        </Box>
        <NavLinks />
        {!user && <AdminMaker array={nonUserLinks} />}
      </NavBar> */}
      {user?.role === 'ADMIN' && (
        <div className='fixed bottom-0 right-5 md:right-5'>
          <AdminMaker array={adminLinks} />
        </div>
      )}

      <main className='grow'>{children}</main>

      <Footer
        height={60}
        sx={{
          borderTop: '1px solid',
          borderColor: 'gray-300',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
          padding: '1rem'
        }}
      >
        Footer
      </Footer>
    </>
  )
}

function NavLinks() {
  const [isActive, setIsActive] = useState(false)
  const toggle = () => setIsActive(!isActive)
  const user = useOptionalUser()

  return (
    <Box
      sx={{
        display: 'flex',
        gap: '1rem'
      }}
    >
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
    </Box>
  )
}
