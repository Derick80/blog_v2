/* eslint-disable react/no-danger-with-children */
import type { SerializedPost } from '~/utils/schemas/post-schema'
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
  Avatar,
  Button,
  Divider,
  Group,
  Spoiler,
  Switch,
  Tooltip
} from '@mantine/core'
import type { Like } from '~/utils/schemas/like-schema'
import FormComments from '~/components/comments/com-form'
import ListComments from '~/components/comments/comList'
import formatComments from './format-comments'
import React from 'react'
import { ChatBubbleIcon } from '@radix-ui/react-icons'
import { useOptionalUser } from '~/utils/utilities'

export type ManyPostProps = {
  data: SerializedPost & {
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
}: BasicCardProps) => {
  const currentUser = useOptionalUser()
  const {
    id,
    title,
    description,
    body,
    imageUrl,
    createdAt,
    categories,
    likes,
    _count,
    featured,
    favorites
  } = data
  // this should be set to false outside of active development
  const [open, setOpen] = React.useState(false)
  return (
    <>
      <div
        key={id}
        className='w-[350px] rounded-2xl text-black shadow-2xl dark:text-slate-50 md:w-[650px]'
      >
        <div>
          {imageUrl && (
            <img className='h-auto max-w-full' src={imageUrl} alt={title} />
          )}
        </div>

        <div>
          <NavLink
            to={`/blog/${id}`}
            className='text-lg font-bold text-black dark:text-slate-50'
            style={{ textDecoration: 'none', color: 'currentcolor' }}
          >
            <h2 className='indent-1 text-lg font-bold'>{title}</h2>
          </NavLink>
          <p className='prose p-1 indent-1 italic dark:prose-invert'>
            {description}
          </p>

          {showCategories && (
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
          {/* I ALMOST removed show more from Mantine because it was breaking with page refresh in both production and development but then I remembered that the <p> tag in the dangerouslSetInnerHtml element was breaking and I have to use div for a reason unknown to me */}

          <Spoiler maxHeight={120} showLabel='More...' hideLabel='...less'>
            {body && (
              <div
                dangerouslySetInnerHTML={{ __html: body }}
                className='prose prose-sm h-full p-1 indent-1 dark:prose-invert'
              ></div>
            )}
          </Spoiler>
          <Switch
          className='text-slate-50'
          color={featured ? 'red' : 'blue'}
            label='Featured Post'
            defaultChecked={featured}
            onChange={() => console.log('changed')}
            disabled
          />
        </div>

        <div className='flex flex-row items-center justify-between'>
          <div className='flex flex-row space-x-2 p-2'>
            {showLikes && likes && currentUser && (
              <LikeContainer
                postId={id}
                likes={likes}
                likeCounts={_count?.likes}
                currentUser={currentUser.id}
              />
            )}
            {showFavorites && currentUser && (
              <FavoriteContainer
                postId={id}
                favorites={favorites}
                currentUser={currentUser.id}
              />
            )}
            {showComments && data.comments && (
              <Button
                type='button'
                variant='subtle'
                onClick={() => setOpen(!open)}
              >
                <div className='flex flex-row space-x-1'>
                  <ChatBubbleIcon />
                  <p className='text-xs'> {_count.comments}</p>
                </div>
              </Button>
            )}
            {showShare && id && <ShareButton id={id} />}
            {showOptions && <PostOptions postId={id} />}
          </div>
          <div className='flex flex-col items-center space-x-2'>
            {user?.avatarUrl && (
              <Tooltip label={user?.userName} position='top'>
                <Avatar
                  src={user?.avatarUrl}
                  variant='filled'
                  radius='xl'
                  size='sm'
                />
              </Tooltip>
            )}
            <p className='text-xs text-gray-200'>
              {createdAt && new Date(createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        <Divider />
        <Group position='right'></Group>
        {showComments && data.comments.length > 0 && id && (
          <div className='flex flex-col'>
            {currentUser && <FormComments postId={id} />}
            {open && data.comments && (
              <ListComments comments={formatComments(data.comments || [])} />
            )}
            <Button onClick={() => setOpen(!open)}>
              {open ? 'Hide' : 'Show'} Comments
            </Button>
          </div>
        )}
      </div>
    </>
  )
}
