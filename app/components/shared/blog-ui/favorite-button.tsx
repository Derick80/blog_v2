import { BookmarkFilledIcon, BookmarkIcon } from '@radix-ui/react-icons'
import type { FormMethod } from '@remix-run/react'
import { useFetcher } from '@remix-run/react'
import { useState, useRef } from 'react'
import type { serializedQueriedPost } from '~/models/post.server'

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
        className='hover:bg-slate-100 disabled:hover:bg-transparent relative flex items-center gap-2 rounded-lg p-2 transition'
        onClick={toggleFavorite}
      >
        {isFavorite ? (
          <BookmarkFilledIcon className='text-crimson10' />
        ) : (
          <BookmarkIcon />
        )}
      </button>
    </>
  )
}
