import { FormMethod, useFetcher } from '@remix-run/react'
import { useState, useRef } from 'react'
import { SerializedPost, serializedQueriedPost } from '~/models/post.server'
import { BookMark } from '../icons'

export type FavoriteContainerProps = {
  currentUser: string
  postId: string
  post: serializedQueriedPost
}

export default function FavoriteContainer({
  currentUser,
  postId,
  post
}: FavoriteContainerProps) {
  const fetcher = useFetcher()
  const userFavoritedPost = post?.favorites?.find(
    ({ userId }) => userId === currentUser
  )
    ? true
    : false

  const [isFavorite, setIsFavorite] = useState(userFavoritedPost)
  const iconRef = useRef<null | SVGSVGElement>(null)
  const iconButtonRef = useRef<null | HTMLButtonElement>(null)
  const toggleFavorite = async () => {
    let method: FormMethod = 'delete'
    if (userFavoritedPost) {
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
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
          height={24}
          width={24}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z'
          ></path>
        </svg>
      </button>
    </>
  )
}
