import { Button, Text } from '@mantine/core'
import { HeartFilledIcon, HeartIcon } from '@radix-ui/react-icons'
import type { FormMethod } from '@remix-run/react'
import { NavLink, useFetcher } from '@remix-run/react'
import { IconLogin } from '@tabler/icons'
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

    console.log('userLikedPost', userLikedPost);

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
        <Button type='button' variant='subtle' onClick={toggleLike}>
          {isLiked ? (
           <div className='flex flex-row space-x-1'>
              <HeartFilledIcon style={{ color: 'red', fill: 'red' }} />
              <p
                className='text-xs space-x-1'
              >{likeCount}</p>
            </div>
          ) : (
            <div className='flex flex-row space-x-1'>
              <HeartIcon />
              <p
                className='text-xs space-x-1'
              >{likeCount}</p>
            </div>
          )}
        </Button>
      ) : (
        <>
          <Text>
            <Text>Liked by: {likeCount}</Text>
          </Text>
          <NavLink
            to='/login'
            style={{ textDecoration: 'none', color: 'currentcolor' }}
          >
            <IconLogin />
          </NavLink>
        </>
      )}
    </>
  )
}
