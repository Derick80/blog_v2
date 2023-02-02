import { useOptionalUser } from '~/utils/utilities'
import { Flex, Group, Text, Title } from '@mantine/core'
import { BrandIcon } from '../icons'
import { Form, Link } from '@remix-run/react'
import Footer from './footer'

export default function Layout({ children }: { children: React.ReactNode }) {
  const user = useOptionalUser()
  return (
    <Flex direction='column' gap={2} align='center'>
      <Group position='center' spacing='sm' align='center'>
        <div className='h-20 w-20'>
          <BrandIcon />
        </div>
        <Title> Derick C. Hoskinson PhD</Title>
      </Group>
      <Flex direction='row' gap={10}>
        <Link to='/'>
          <Text>Home</Text>
        </Link>
        <Link to='/blog'>
          <Text>Blog</Text>
        </Link>
        <Link to='/about'>
          <Text>About</Text>
        </Link>
        <Link to='/projects'>
          <Text>Projects</Text>
        </Link>
        <Link to='/users'>
          <Text>Users</Text>
        </Link>
        {user ? (
          <Form method='post' action='/logout'>
            <button type='submit'>Logout</button>
          </Form>
        ) : (
          <Link to='/login'>Login</Link>
        )}
      </Flex>
      <Flex
        direction={'column'}
        gap={5}
        style={{
          marginTop: '2rem'
        }}
        className='h-full w-[350px] md:w-full'
      >
        {children}
      </Flex>
      <Footer />
    </Flex>
  )
}
