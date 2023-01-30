import { useState } from 'react'
import { nonUserLinks, siteLinks, userLinks } from '~/utils/constants/links'
import { useOptionalUser } from '~/utils/utilities'
import LinkMaker from './link-maker'
import AdminMaker from './admin-maker'
import Dropdown from '../blog-ui/dropdown'
import { Flex, Group, Title } from '@mantine/core'
import { BrandIcon } from '../icons'

export default function Layout({ children }: { children: React.ReactNode }) {
  const user = useOptionalUser()
  return (
    <Flex direction='column' gap={2}>
      <Group position='center' spacing='sm' align='center'>
        <div className='h-20 w-20'>
          <BrandIcon />
        </div>
        <Title> Derick C. Hoskinson PhD</Title>

        <NavLinks />

        {!user && <AdminMaker array={nonUserLinks} />}
        <Group position='center'>
          {/* <Flex direction={'row'} align='center' justify='space-between' gap={5}>
          <Text>
            <a
              href='https://www.github.com/Derick80'
              className='social'
              aria-label='GitHub'
            >
              <IconBrandGithub />
            </a>
          </Text>

          <Text>
            <a
              href='https://www.linkedin.com/in/dhoskinson'
              className='social'
              target='_blank'
              rel='noopener noreferrer'
              aria-label='LinkedIn'
            >
              <IconBrandLinkedin />
            </a>
          </Text>
        </Flex> */}
        </Group>
      </Group>
      <Flex direction={'column'} gap={5} className='h-full w-[350px] md:w-full'>
        {children}
      </Flex>
    </Flex>
  )
}

function NavLinks() {
  const [isActive, setIsActive] = useState(false)
  const toggle = () => setIsActive(!isActive)
  const user = useOptionalUser()

  return (
    <>
      <Flex direction={'row'} align='center' justify='space-between' gap={5}>
        <Flex>
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
        </Flex>
      </Flex>
    </>
  )
}
