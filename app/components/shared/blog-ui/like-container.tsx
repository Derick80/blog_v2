import { Button, Text } from '@mantine/core'
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
        <Button type='button' variant='subtle' onClick={toggleLike}>
          {isLiked ? (
            <>
              <IconHeart style={{ color: 'red', fill: 'red' }} />
              <Text>{likeCount}</Text>
            </>
          ) : (
            <>
              <IconHeartPlus />
              <Text>{likeCount}</Text>
            </>
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
