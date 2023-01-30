/* eslint-disable react/no-danger-with-children */
import { format } from 'date-fns'
import type { Post, SerializedEditPost } from '~/utils/schemas/post-schema'
import type { User } from '~/utils/schemas/user-schema'
import PostOptions from './post-options'
import FavoriteContainer from './favorite-container'
import LikeContainer from './like-container'
import { ShareButton } from './share-button'
import type { CommentWithChildren } from '~/utils/schemas/comment-schema'
import type { Favorite } from '~/utils/schemas/favorite.schema'
import { NavLink } from '@remix-run/react'
import CategoryContainer from '../category-container'
import {
  AspectRatio,
  Avatar,
  Button,
  Card,
  Divider,
  Flex,
  Group,
  Image,
  MediaQuery,
  Space,
  Spoiler,
  Stack,
  Text,
  Tooltip,
  TypographyStylesProvider
} from '@mantine/core'
import type { Like } from '~/utils/schemas/like-schema'
import FormComments from '~/components/comments/com-form'
import ListComments from '~/components/comments/comList'
import formatComments from './format-comments'
import React from 'react'

export type ManyPostProps = {
  data: Post & {
    comments: CommentWithChildren[]
  } & {
    favorites: Favorite[]
    likes: Like[]
    _count: {
      comments: number
      favorites: number
      likes: number
    }
  }
  user: User | null
}

export type EditPostCardProps = {
  data: SerializedEditPost & {
    comments: CommentWithChildren[]
  } & {
    favorites: Favorite[]
    likes: Like[]
    _count: {
      comments: number
      favorites: number
      likes: number
    }
  }
  user: User | null
}
export type TheBasicCardProps = {
  showLikes: boolean
  showFavorites: boolean
  showComments: boolean
  showShare: boolean
  showOptions: boolean
  showCategories: boolean
} & EditPostCardProps
export type BasicCardProps = {
  showLikes: boolean
  showFavorites: boolean
  showComments: boolean
  showShare: boolean
  showOptions: boolean
  showCategories: boolean
} & ManyPostProps

export const PostCard = ({
  data,
  user,
  showComments,
  showLikes,
  showFavorites,
  showShare,
  showOptions,
  showCategories
}: BasicCardProps | TheBasicCardProps) => {
  const {
    id,
    title,
    description,
    body,
    imageUrl,
    createdAt,
    published,
    categories,
    likes,
    _count,
    favorites
  } = data
  const [open, setOpen] = React.useState(false)
  return (
    <>
      <Card
        key={id}
        shadow='sm'
        radius='md'
        withBorder
        className='w-[350px] md:w-[650px]'
      >
        <Card.Section>
          {imageUrl && (
            <MediaQuery smallerThan='md' styles={{ maxWidth: 350 }}>
              <AspectRatio ratio={3 / 2} sx={{ maxWidth: 650 }}>
                <Image
                  src={imageUrl}
                  alt={title}
                  radius='md'
                  style={{
                    width: '100%',
                    height: '100%'
                  }}
                  fit='cover'
                />
              </AspectRatio>
            </MediaQuery>
          )}
        </Card.Section>

        <Card.Section>
          <NavLink
            to={`/blog/${id}`}
            className='text-gray-900 text-lg font-bold'
            style={{ textDecoration: 'none', color: 'currentcolor' }}
          >
            <Text
              className='prose prose-xl dark:prose-invert'
              weight={600}
              fz='xl'
            >
              {title}
            </Text>
          </NavLink>
          {showCategories && categories && (
            <div
              className='flex flex-row space-x-2 p-2'
              style={{ width: 'fit-content' }}
            >
              {categories.map((category, index) => (
                <CategoryContainer
                  key={index}
                  index={index}
                  value={category.value}
                />
              ))}
            </div>
          )}

          <div className='prose prose-sm h-full'>
            <TypographyStylesProvider>
              <Spoiler maxHeight={120} showLabel='Show more' hideLabel='Hide'>
                {body && (
                  <p
                    dangerouslySetInnerHTML={{ __html: body }}
                    className='prose prose-sm h-full dark:prose-invert'
                  ></p>
                )}
              </Spoiler>
              <Text className='prose prose-sm dark:prose-invert' size='xs'>
                {description}{' '}
              </Text>
            </TypographyStylesProvider>
          </div>
        </Card.Section>

        <Group position='center'>
          <Flex align='center'>
            {showLikes && id && likes && _count && user && (
              <LikeContainer
                postId={id}
                likes={likes}
                likeCounts={_count?.likes}
                currentUser={user.id}
              />
            )}
            <Space w={5} />
            {showFavorites && user && id && (
              <FavoriteContainer
                postId={id}
                favorites={favorites}
                currentUser={user?.id}
              />
            )}

            {showShare && id && <ShareButton id={id} />}
            {showOptions && id && (
              <PostOptions
                id={id}
                published={published === true ? true : false}
              />
            )}

            {user?.avatarUrl && (
              <>
                <Tooltip label={user?.userName} position='top'>
                  <Avatar
                    src={user?.avatarUrl}
                    variant='filled'
                    radius='xl'
                    size='sm'
                  />
                </Tooltip>
              </>
            )}
          </Flex>
        </Group>
        <Divider />
       {showComments && id && (
         <Flex direction={'column'}>
         <FormComments />
         {open && data.comments && (
           <ListComments comments={formatComments(data.comments || [])} />
         )}
         <Button onClick={() => setOpen(!open)}>
           {open ? 'Hide' : 'Show'} Comments
         </Button>
       </Flex>
       )}
      </Card>
    </>
  )
}
