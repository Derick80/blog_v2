import { Group, Space } from '@mantine/core'
import { NavLink } from '@remix-run/react'

export type LinkMakerProps = {
  link: {
    name: string
    href: string
    icon_name: string
  }
  toggle?: () => void
  children?: React.ReactNode
}

export default function LinkMaker({
  link: { name, href, icon_name },
  toggle,
  children
}: LinkMakerProps) {
  return (
    <Group position='center' spacing={'xl'} key={name}>
      <NavLink
        style={{ textDecoration: 'none', color: 'currentcolor' }}
        to={href}
        className={({ isActive }) =>
          ` ${
            isActive
              ? 'border-black flex flex-col items-center border-b-2'
              : 'flex flex-col items-center'
          }`
        }
        onClick={toggle}
        prefetch='intent'
      >
        {name}
        {children}
      </NavLink>
      <Space h='md' />
    </Group>
  )
}
