/* eslint-disable react/no-danger-with-children */
import type { SerializedEditPost, Post } from '~/utils/schemas/post-schema'
import type { User } from '~/utils/schemas/user-schema'
import type { Comment } from '~/utils/schemas/comment-schema'
import type { Favorite } from '~/utils/schemas/favorite.schema'
import { Card, Group, Image, Text } from '@mantine/core'
import PostOptions from './post-options'
import LikeContainer from './like-container'
import FavoriteContainer from './favorite-container'
import { ShareButton } from './share-button'

export type ManyPostProps = {
  data: Post & {
    comments: Comment[]
  } & {
    favorites: Favorite[]
  }
  user: User | null
}

export type EditPostCardProps = {
  data: SerializedEditPost & {
    comments: Comment[]
  } & {
    favorites: Favorite[]
  }
  user: User | null
}
export type TheBasicCardProps = {
  showLikes: boolean
  showFavorites: boolean
  showComments: boolean
  showShare: boolean
  showOptions: boolean
} & EditPostCardProps
export type BasicCardProps = {
  showLikes: boolean
  showFavorites: boolean
  showComments: boolean
  showShare: boolean
  showOptions: boolean
} & ManyPostProps

export const PostCard = ({
  data,
  user,
  showComments,
  showLikes,
  showFavorites,
  showShare,
  showOptions
}: BasicCardProps | TheBasicCardProps) => {
  const {
    id,
    title,
    description,
    body,
    imageUrl,
    _count,
    likes,
    createdAt,
    updatedAt,
    published,
    createdBy,
    comments,
    favorites
  } = data

  return (
    <Card
      shadow='sm'
      radius='md'
     withBorder
    >

      <Card.Section>
      <Text
        size="xl"
        weight="bold"
        sx={{
          textTransform: 'capitalize',
          overflow: 'hidden',
        }}


      >{title}</Text>
      <Text
        size="sm"
        italic

      >{description}</Text>
      </Card.Section>

        <Group spacing='md'>


      </Group>
      <Group position='left' spacing='md'>
      <Card.Section>
      <Image
          src={imageUrl}
          alt={title}
          height={300}
          width={300}
          radius='md'
        />

      </Card.Section>
      <Card.Section>
      {body &&   <Text
        size='md'

      sx={{
        padding: '1.0rem',
        overflow: 'hidden',
      }}

        dangerouslySetInnerHTML={{ __html: body }}
        />}
      </Card.Section>

      </Group>
      <Card.Section>
      <Group position='left' spacing='md'>
        { showLikes && id && user &&

          <LikeContainer
            likeCounts={_count?.likes}
            likes={likes}
            postId={id}
            currentUser={user.id}
          />



        }

{showFavorites && user && id && (
            <FavoriteContainer
              postId={id}
              favorites={favorites}
              currentUser={user?.id}
            />
          )}

          {showShare && id && <ShareButton id={id} />}

    { showOptions && id &&  <PostOptions

     id={id}
     published={published}

    />}


      </Group>
      </Card.Section>

    </Card>  )
}
