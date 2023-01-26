import { useState } from 'react'
import { nonUserLinks, siteLinks, userLinks } from '~/utils/constants/links'
import { useOptionalUser } from '~/utils/utilities'
import LinkMaker from './link-maker'
import AdminMaker from './admin-maker'
import { GitHubLogoIcon, LinkedInLogoIcon } from '@radix-ui/react-icons'
import Dropdown from '../blog-ui/dropdown'
import { Text, Flex, Group, Title, Container, Center } from '@mantine/core'

export default function Layout({ children }: { children: React.ReactNode }) {
  const user = useOptionalUser()
  return (
    <Flex direction='column'>
      <Group position='center'>
        <NavLinks />

        {!user && <AdminMaker array={nonUserLinks} />}
      </Group>
      <Flex direction={'column'} gap={5}>
        {children}
      </Flex>

      <Group position='center'>
        <Flex direction={'row'} align='center' justify='space-between' gap={5}>
          <Text>
            <a
              href='https://www.github.com/Derick80'
              className='social'
              aria-label='GitHub'
            >
              <GitHubLogoIcon />
            </a>
          </Text>
          <Text>
            <p className='mr-4'> copyright &copy; {new Date().getFullYear()}</p>
          </Text>
          <Text>
            <a
              href='https://www.linkedin.com/in/dhoskinson'
              className='social'
              target='_blank'
              rel='noopener noreferrer'
              aria-label='LinkedIn'
            >
              <LinkedInLogoIcon />
            </a>
          </Text>
        </Flex>
      </Group>
    </Flex>
  )
}

function NavLinks() {
  const [isActive, setIsActive] = useState(false)
  const toggle = () => setIsActive(!isActive)
  const user = useOptionalUser()

  return (
    <>
      <Title size={6}> Derick C. Hoskinson PhD</Title>
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
        <Dropdown />
      </Flex>
    </>
  )
}
