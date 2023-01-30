import { Drawer, Group, Button, Text } from '@mantine/core'
import React from 'react'

export default function PostDrawer() {
  const [opened, setOpened] = React.useState(false)
  return (
    <>
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title='Register'
        padding='xl'
        size='xl'
      >
        {/* Drawer content */}
      </Drawer>
      <Group position='center'>
        <Text>Post</Text>
        <Button onClick={() => setOpened(true)}>Open Drawer</Button>
      </Group>
    </>
  )
}
