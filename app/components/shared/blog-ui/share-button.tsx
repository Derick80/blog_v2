import { useState, useRef } from 'react'
import { SerializedPost } from '~/models/post.server'
import { Divider } from '../layout/divider'
import { iconAttrs } from '../icons'
import Footer from '../layout/footer'
import { Modal } from '../layout/modal'
import { useToast } from '../toaster'
import {
  CopyIcon,
  Cross2Icon,
  DiscIcon,
  DiscordLogoIcon,
  InstagramLogoIcon,
  Share1Icon,
  Share2Icon,
  TwitterLogoIcon
} from '@radix-ui/react-icons'

type Props = {
  id: string | number
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
      <button
        type='button'
        className='rounded-lg p-2 transition hover:bg-crimson5'
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
      <Modal isOpen={isOpen} onClick={() => setIsOpen(false)}>
        <div className='flex justify-center gap-5'>
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
        </div>
        <Divider bgColor='bg-white dark:bg-slate-900'>
          Or share with link
        </Divider>
        <div className='relative'>
          <input
            id='share'
            type='text'
            className='slate1 w-11/12 rounded border-0 text-center transition dark:bg-crimson1'
            value={postUrl}
            onClick={copyLink}
            ref={ref}
            readOnly
          />
          <button
            type='button'
            className='absolute  right-3 -top-1 p-2 transition'
            onClick={copyLink}
          >
            <CopyIcon />
          </button>
        </div>
      </Modal>
    </>
  )
}
