import type { FormMethod } from '@remix-run/react'
import { NavLink, useFetcher } from '@remix-run/react'
import { useRef, useState } from 'react'
import type { serializedQueriedPost } from '~/models/post.server'

export type LikeContainerProps = {
  post: serializedQueriedPost
  currentUser: string
  postId: string | ''
}

export default function LikeContainer({
  post,
  currentUser,
  postId
}: LikeContainerProps) {
  const fetcher = useFetcher()
  const userLikedPost = post?.likes?.find(
    ({ userId }) => userId === currentUser
  )
    ? true
    : false

  const [likeCount, setLikeCount] = useState(post?._count?.likes || 0)
  const [isLiked, setIsLiked] = useState(userLikedPost)
  const iconRef = useRef<null | SVGSVGElement>(null)
  const iconButtonRef = useRef<null | HTMLButtonElement>(null)
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
    console.log('likeCount', likeCount)

    fetcher.submit(
      { userId: currentUser, postId },
      { method, action: `/blog/${postId}/like` }
    )
  }

  return (
    <>
      {currentUser ? (
        <button
          ref={iconButtonRef}
          type='button'
          className='relative flex items-center gap-2 rounded-lg p-2 transition hover:bg-slate-100 disabled:hover:bg-transparent dark:hover:bg-slate-700'
          onClick={toggleLike}
        >
          <svg
            className={`${isLiked ? 'text-red-500' : 'text-slate-400'}`}
            ref={iconRef}
            width='16'
            height='16'
            viewBox='0 0 24 24'
            stroke='currentColor'
            fill='currentColor'
          >
            <path d='m18.199 2.04c-2.606-.284-4.262.961-6.199 3.008-2.045-2.047-3.593-3.292-6.199-3.008-3.544.388-6.321 4.43-5.718 7.96.966 5.659 5.944 9 11.917 12 5.973-3 10.951-6.341 11.917-12 .603-3.53-2.174-7.572-5.718-7.96z' />
          </svg>
          <span className='min-w-[0.75rem]'>{likeCount}</span>
        </button>
      ) : (
        <>
          <small className='flex items-center'>
            <span className='min-w-[0.75rem]'>Liked by: {likeCount}</span>
          </small>
          <NavLink to='/login' className='flex items-center'>
            <span className='material-symbols-outlined'>login</span>
            <p className='hidden md:block'>Sign In to Like</p>
          </NavLink>
        </>
      )}
    </>
  )
}
