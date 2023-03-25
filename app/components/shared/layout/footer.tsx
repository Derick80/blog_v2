import { Text } from '@mantine/core'
import { GitHubLogoIcon, LinkedInLogoIcon } from '@radix-ui/react-icons'

export default function Footer({ children }: { children?: React.ReactNode }) {
  return (
    <footer className='col-span-12 row-start-3 mt-5 flex w-full items-center justify-center gap-5'>
      <div className='flex items-center gap-5'>
        <a
          href='https://github.com/Derick80'
          target='_blank'
          rel='noopener noreferrer'
        >
          <GitHubLogoIcon />
        </a>

        <p className='p'>Copyrite {new Date().getFullYear()}</p>
        <a
          href='https://www.linkedin.com/in/dhoskinson/'
          target='_blank'
          rel='noopener noreferrer'
        >
          <LinkedInLogoIcon />
        </a>
      </div>
    </footer>
  )
}
