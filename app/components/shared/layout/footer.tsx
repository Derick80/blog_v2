import { GitHubLogoIcon, LinkedInLogoIcon } from '@radix-ui/react-icons'
import { socialLinks } from '~/utils/constants/social-links'

export default function Footer() {
  return (
    <footer className='col-span-12 row-start-3 mt-5 flex w-full items-center justify-center gap-5'>
      <p className='p'>Copyrite { new Date().getFullYear() }</p>
{/* map through social links array  */}
      {
        socialLinks.map((social)=>
        (
          <a key={social.name}
            href={social.href}
            target='_blank'
            rel='noopener noreferrer'
          >
            {social.icon}
          </a>

        ))
      }


    </footer>
  )
}
