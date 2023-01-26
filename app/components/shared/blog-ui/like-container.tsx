import { HeartFilledIcon, HeartIcon } from '@radix-ui/react-icons'
import type { FormMethod } from '@remix-run/react'
import { NavLink, useFetcher } from '@remix-run/react'
import { IconHeart, IconHeartPlus, IconLogin } from '@tabler/icons'
import { useState } from 'react'
import type { Like } from '~/utils/schemas/like-schema'

export type LikeContainerProps = {
  likes: Like[]
  likeCounts: number
  currentUser: string
  postId: string
}

export default function LikeContainer({
  likes,
  likeCounts,
  currentUser,
  postId
}: LikeContainerProps) {
  const fetcher = useFetcher()
  const userLikedPost = likes?.find(({ userId }) => {
    return userId === currentUser
  })
    ? true
    : false

  const [likeCount, setLikeCount] = useState(likeCounts || 0)
  const [isLiked, setIsLiked] = useState(userLikedPost)

  const toggleLike = async () => {
    let method: FormMethod = 'delete'
    if (userLikedPost) {
      setLikeCount(likeCount - 1)
      setIsLiked(false)
    } else {
      method = 'post'
      setLikeCount(likeCount + 1)
      setIsLiked(true)
    }

    fetcher.submit(
      { userId: currentUser, postId },
      { method, action: `/blog/${postId}/like` }
    )
  }

  return (
    <>
      {currentUser ? (
        <button
          type='button'
          className='hover:bg-slate-100 disabled:hover:bg-transparent dark:hover:bg-slate-700 relative flex items-center gap-2 rounded-lg p-2 transition'
          onClick={toggleLike}
        >
          {isLiked ? (
            <IconHeart className='text-crimson10' />
          ) : (
            <IconHeartPlus />
          )}

          <span className='min-w-[0.75rem]'>{likeCount}</span>
        </button>
      ) : (
        <>
          <small className='flex items-center'>
            <span className='min-w-[0.75rem]'>Liked by: {likeCount}</span>
          </small>
          <NavLink to='/login' className='flex items-center'>
            <IconLogin />
          </NavLink>
        </>
      )}
    </>
  )
}
