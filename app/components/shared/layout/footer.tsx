import { Text } from '@mantine/core'
import { IconBrandGithub, IconBrandLinkedin } from '@tabler/icons'

export default function Footer({ children }: { children?: React.ReactNode }) {
  return (
    <footer className='flex items-center justify-center'>
      <div className='flex items-center justify-between'>
        <a
          href='https://github.com/Derick80'
          target='_blank'
          rel='noopener noreferrer'
        >
          <IconBrandGithub />
        </a>

        <Text>Copy write {new Date().getFullYear()}</Text>
        <a
          href='https://www.linkedin.com/in/dhoskinson/'
          target='_blank'
          rel='noopener noreferrer'
        >
          <IconBrandLinkedin />
        </a>
      </div>
    </footer>
  )
}
