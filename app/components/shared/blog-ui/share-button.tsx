import { useState, useRef } from 'react'
import { Divider } from '@mantine/core'

import { useToast } from '../toaster'
import {
  CopyIcon,
  DiscordLogoIcon,
  InstagramLogoIcon,
  Share1Icon,
  TwitterLogoIcon
} from '@radix-ui/react-icons'
import { Button, Flex, Popover } from '@mantine/core'

type Props = {
  id: string
}

const iconClassName =
  'bg-slate-100 rounded-full p-3 text-black0 transition hover:text-primary-dark hover:bg-primary-bg dark:bg-slate-600 dark:text-slate-200 dark:hover:text-primary-light border-none'

export const ShareButton = ({ id }: Props) => {
  const { toast } = useToast()
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLInputElement | null>(null)
  const postUrl = `https://derickhoskinson.com/blog/${id}`
  const encodedPostUrl = encodeURIComponent(postUrl)

  const copyLink = () => {
    ref.current?.select()
    ref.current?.setSelectionRange(0, 99999)
    navigator.clipboard.writeText(postUrl)
    toast('📝 Copied to Clipboard')
  }

  return (
    <>
      <Popover width={300} position='top' withArrow>
        <Popover.Target>
          <button
            className='text-blue-500'
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: 'A Post from the Blog',
                  url: postUrl
                })
              } else {
                setIsOpen(true)
              }
            }}
          >
            <Share1Icon />
          </button>
        </Popover.Target>
        <Popover.Dropdown>
          <Flex gap={3} justify='space-between'>
            <a
              className={iconClassName}
              href={`https://www.instagram.com/sharer/sharer.php?u=${encodedPostUrl}`}
              target='_blank'
              rel='noopener noreferrer'
            >
              <InstagramLogoIcon />
            </a>
            <a
              className={iconClassName}
              href={`http://twitter.com/share?url=${encodedPostUrl}`}
              target='_blank'
              rel='noopener noreferrer'
            >
              <TwitterLogoIcon />
            </a>
            <a
              className={iconClassName}
              href={`https://discord.me/share/url?url=${encodedPostUrl}`}
              target='_blank'
              rel='noopener noreferrer'
            >
              <DiscordLogoIcon />
            </a>
          </Flex>
          <Divider>Or share with link</Divider>
          <div className='mt-2 flex w-full items-center gap-1'>
            <input
              id='share'
              type='text'
              className='w-full rounded-md bg-slate-100 p-3 text-xs text-black0 dark:bg-slate-600 dark:text-slate-200'
              value={postUrl}
              onClick={copyLink}
              ref={ref}
              readOnly
            />
            <button type='button' className='text-blue-500' onClick={copyLink}>
              <CopyIcon />
            </button>
          </div>
        </Popover.Dropdown>
      </Popover>
    </>
  )
}
