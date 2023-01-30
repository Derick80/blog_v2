import { Button } from '@mantine/core'
import { BookmarkFilledIcon, BookmarkIcon } from '@radix-ui/react-icons'
import type { FormMethod } from '@remix-run/react'
import { useFetcher } from '@remix-run/react'
import { IconBookmark } from '@tabler/icons'
import { useState } from 'react'
import type { Favorite } from '~/utils/schemas/favorite.schema'
export type FavoriteContainerProps = {
  currentUser: string
  postId: string
  favorites: Favorite[]
}

export default function FavoriteContainer({
  currentUser,
  postId,
  favorites
}: FavoriteContainerProps) {
  const fetcher = useFetcher()
  const userFavoritedPost = favorites?.find(
    ({ userId }) => userId === currentUser
  )
    ? true
    : false

  const [isFavorite, setIsFavorite] = useState(userFavoritedPost)

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
      <Button type='button' variant='subtle' onClick={toggleFavorite}>
        {isFavorite ? (
          <IconBookmark style={{ color: 'red', fill: 'red' }} />
        ) : (
          <IconBookmark />
        )}
      </Button>
    </>
  )
}
