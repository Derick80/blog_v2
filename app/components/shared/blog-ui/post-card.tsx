/* eslint-disable react/no-danger-with-children */
import type {
  PostWithChildren,
  SerializedPost
} from '~/utils/schemas/post-schema'
import type { User } from '~/utils/schemas/user-schema'
import PostOptions from './post-options'
import FavoriteContainer from './favorite-container'
import LikeContainer from './like-container'
import { ShareButton } from './share-button'
import type { CommentWithChildren } from '~/utils/schemas/comment-schema'
import type { Favorite } from '~/utils/schemas/favorite.schema'
import { NavLink } from '@remix-run/react'
import CategoryContainer from '../category-container'
import { Avatar, Button, Divider, Group, Spoiler, Tooltip } from '@mantine/core'
import type { Like } from '~/utils/schemas/like-schema'
import FormComments from '~/components/comments/com-form'
import ListComments from '~/components/comments/comList'
import formatComments from './format-comments'
import React from 'react'
import { ChatBubbleIcon } from '@radix-ui/react-icons'
import { useOptionalUser } from '~/utils/utilities'

export type ManyPostProps = {
  data: PostWithChildren
  user: User
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
    userId,
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
        className='group h-full w-[350px] transform rounded-xl from-crimson3 to-crimson2 text-black shadow-md transition duration-300 hover:-translate-y-2 dark:bg-gradient-to-r dark:text-slate-50 md:w-[550px]'
      >
        <div className='mx-auto flex flex-col items-center  p-2'>
          {imageUrl && (
            <img
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              src={imageUrl}
              alt={title}
            />
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
        </div>
        <div className='flex flex-row justify-end space-x-2 p-2'>
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
            <p className='text-xs text-black dark:text-slate-50'>
              {createdAt && new Date(createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className='flex-wsrap flex flex-row items-center gap-2'>
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
                favorites={favorites as Favorite[]}
                postId={id}
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
            {showOptions && currentUser?.id === userId && (
              <PostOptions postId={id} />
            )}
          </div>
        </div>
        <Divider />
        <Group position='right'></Group>
        {showComments && id && (
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
