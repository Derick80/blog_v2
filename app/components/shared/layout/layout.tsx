import { useOptionalUser } from '~/utils/utilities'
import { Button, Drawer, Flex, Group, Text, Title } from '@mantine/core'
import { BrandIcon } from '../icons'
import { Form, Link } from '@remix-run/react'
import Footer from './footer'
import React from 'react'
import { IconMenu, IconMenu2 } from '@tabler/icons'

export default function Layout({ children }: { children: React.ReactNode }) {
  const user = useOptionalUser()
  const [open, setOpen] = React.useState(false)
  return (
    <Flex direction='column' gap={2} align='center'>
      <Group position='center' spacing='sm' align='center'>
        <div className='h-20 w-20'>
          <BrandIcon />
        </div>
        <Title> Derick C. Hoskinson PhD</Title>
      </Group>
      <Flex direction='row' gap={10}>
      <div
        className='hidden md:flex-row gap-5 md:flex items-center'
        >
        <Link to='/'
        onClick={() => setOpen(!open)}
        >
          <Text>Home</Text>
        </Link>
        <Link to='/blog'
        onClick={() => setOpen(!open)}
        >
          <Text>Blog</Text>
        </Link>
        <Link to='/about'
        onClick={() => setOpen(!open)}
        >
          <Text>About</Text>
        </Link>
        <Link to='/projects'
        onClick={() => setOpen(!open)}
        >
          <Text>Projects</Text>
        </Link>
        <Link to='/travel'
        onClick={() => setOpen(!open)}
        >
          <Text>Travel</Text>
        </Link>
        <Link to='/users'
        onClick={() => setOpen(!open)}
        >
          <Text>Users</Text>
        </Link>

        {user ? (
          <Form method='post' action='/logout'>
            <button type='submit'>Logout</button>
          </Form>
        ) : (
          <Link to='/login'>Login</Link>
        )}



      </div>
      <Drawer

      opened={open}
        onClose={() => setOpen(false)}
        title="Menu"
        padding="xl"
        size="xl"
        position='top'
        transition="slide-down"
        transitionDuration={250}
        transitionTimingFunction="ease"
      >
        <div
        className='flex flex-col md:flex-row items-center'
        >
        <Link to='/'
        onClick={() => setOpen(!open)}
        >
          <Text>Home</Text>
        </Link>
        <Link to='/blog'
        onClick={() => setOpen(!open)}
        >
          <Text>Blog</Text>
        </Link>
        <Link to='/about'
        onClick={() => setOpen(!open)}
        >
          <Text>About</Text>
        </Link>
        <Link to='/projects'
        onClick={() => setOpen(!open)}
        >
          <Text>Projects</Text>
        </Link>
        <Link to='/travel'
        onClick={() => setOpen(!open)}
        >
          <Text>Travel</Text>
        </Link>
        <Link to='/users'
        onClick={() => setOpen(!open)}
        >
          <Text>Users</Text>
        </Link>

        {user ? (
          <Form method='post' action='/logout'>
            <button type='submit'>Logout</button>
          </Form>
        ) : (
          <Link to='/login'>Login</Link>
        )}



      </div>
      </Drawer>
      <Button color='teal' variant='subtle'
        className='block md:hidden '
          onClick={() => setOpen(!open)}>

<IconMenu2 />
        </Button>
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
