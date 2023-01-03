import { FormMethod, useFetcher } from '@remix-run/react'
import { useState, useRef } from 'react'
import { SerializedPost } from '~/models/post.server'

export type FavoriteContainerProps = {
  currentUser: string
  postId: string
}

export default function FavoriteContainer({
  currentUser,
  postId
}: FavoriteContainerProps) {
  const fetcher = useFetcher()

  const [isFavorite, setIsFavorite] = useState(false)
  const iconRef = useRef<null | SVGSVGElement>(null)
  const iconButtonRef = useRef<null | HTMLButtonElement>(null)
  const toggleFavorite = async () => {
    let method: FormMethod = 'delete'
    if (isFavorite) {
      setIsFavorite(false)
    } else {
      method = 'post'
      setIsFavorite(true)
    }

    fetcher.submit(
      { userId: currentUser, postId },
      { method, action: `/blog/${postId}/favorite` }
    )
  }

  return (
    <>
      <button
        ref={iconButtonRef}
        type='button'
        className='relative flex items-center gap-2 rounded-lg p-2 transition hover:bg-slate-100 disabled:hover:bg-transparent'
        onClick={toggleFavorite}
      >
        <svg
          className={`${isFavorite ? 'text-blue-600' : 'text-slate-400'}`}
          ref={iconRef}
          fill='currentColor'
          xmlns='http://www.w3.org/2000/svg'
          height='24px'
          viewBox='0 0 24 24'
          width='24px'
        >
          <path d='M0 0h24v24H0V0z' fill='none' />
          <path d='M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z' />
        </svg>
      </button>
    </>
  )
}
