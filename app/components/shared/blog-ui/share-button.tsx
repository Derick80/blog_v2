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
  'bg-slate-100 rounded-full p-3 text-slate-500 transition hover:text-primary-dark hover:bg-primary-bg dark:bg-slate-600 dark:text-slate-200 dark:hover:text-primary-light'

export const ShareButton = ({ id }: Props) => {
  const { toast } = useToast()
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLInputElement | null>(null)
  const postUrl = `http//localhost/blog/${id}`
  const encodedPostUrl = encodeURIComponent(postUrl)

  const copyLink = () => {
    ref.current?.select()
    ref.current?.setSelectionRange(0, 99999)
    navigator.clipboard.writeText(postUrl)
    toast('📝 Copied to Clipboard')
  }

  return (
    <>
      <Popover width={200} position='top' withArrow shadow='md'>
        <Popover.Target>
          <Button
            type='button'
            variant='subtle'
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
          </Button>
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
          <div className='relative'>
            <input
              id='share'
              type='text'
              className='w-11/12 rounded border-0 text-center transition dark:bg-slate9'
              value={postUrl}
              onClick={copyLink}
              ref={ref}
              readOnly
            />
            <Button
              type='button'
              className='absolute  right-3 -top-1 p-2 transition'
              onClick={copyLink}
            >
              <CopyIcon />
            </Button>
          </div>
        </Popover.Dropdown>
      </Popover>
    </>
  )
}
