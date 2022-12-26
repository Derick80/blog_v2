import { Form, useLoaderData } from '@remix-run/react'
import { useState } from 'react'
import { SerializedPost } from '~/utils/schemas/post-schema'
import { User } from '~/utils/schemas/user-schema'
import { useUser } from '~/utils/utils'
import { iconAttrs } from './icons'
import { Modal } from './model'

type Props = {
  post: SerializedPost
}

type LoaderData = {
  user: User | null
}

const buttonClass =
  'w-full text-slate-900 p-5 transition rounded hover:no-underline hover:bg-slate-100 dark:text-slate-100 dark:hover:bg-slate-900'

export const MoreButton = ({ post }: Props) => {
  const user = useUser()
  const [isOpen, setIsOpen] = useState(false)

  const isLoggedIn = user !== null
  const isPostOwner = isLoggedIn && user?.id === post.userId

  return (
    <>
      <button
        type='button'
        className='rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 dark:hover:bg-slate-700'
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg {...iconAttrs} height='48' width='48'>
          <path d='M24 40q-1 0-1.7-.7t-.7-1.7q0-1 .7-1.7t1.7-.7q1 0 1.7.7t.7 1.7q0 1-.7 1.7T24 40Zm0-13.6q-1 0-1.7-.7t-.7-1.7q0-1 .7-1.7t1.7-.7q1 0 1.7.7t.7 1.7q0 1-.7 1.7t-1.7.7Zm0-13.6q-1 0-1.7-.7t-.7-1.7q0-1 .7-1.7T24 8q1 0 1.7.7t.7 1.7q0 1-.7 1.7t-1.7.7Z' />
        </svg>
      </button>
      <Modal isOpen={isOpen} onClick={() => setIsOpen(false)}>
        {isLoggedIn && isPostOwner && (
          <Form method='post' action={`/posts/${post.id}/delete`}>
            <button type='submit' className={buttonClass}>
              Delete Post
            </button>
          </Form>
        )}
      </Modal>
    </>
  )
}
