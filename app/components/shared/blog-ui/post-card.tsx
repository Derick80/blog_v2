/* eslint-disable react/no-danger-with-children */
import type { Post, PostWithChildren } from '~/utils/schemas/post-schema'
import PostOptions from './post-options'
import FavoriteContainer from './favorite-container'
import LikeContainer from './like-container'
import { ShareButton } from './share-button'
import type { Favorite } from '~/utils/schemas/favorite.schema'
import { NavLink } from '@remix-run/react'
import CategoryContainer from '../category-container'
import { Spoiler } from '@mantine/core'
import FormComments from '~/components/comments/com-form'
import ListComments from '~/components/comments/comList'
import React from 'react'
import { ChatBubbleIcon } from '@radix-ui/react-icons'
import { useOptionalUser } from '~/utils/utilities'
import Divider from '../divider'
import dayjs from 'dayjs'
import Button from '../layout/button'

export type ManyPostProps = {
  data: PostWithChildren
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
      <div key={id} className='mx-auto my-5 w-full  rounded-lg p-2 shadow-md'>
        <NavLink
          to={`/blog/${id}`}
          className='p font-bold text-slate12'
          style={{ textDecoration: 'none', color: 'currentcolor' }}
        >
          <h4 className='h4 indent-1'>{title}</h4>
        </NavLink>
        <div className=' items-ceter mx-auto flex flex-col'>
          {imageUrl && (
            <div className='h-24 w-24'>
              <img
                className='h-full w-full rounded-lg object-contain'
                src={imageUrl}
                alt={title}
              />
            </div>
          )}
        </div>

        <div>
          <p className='prose p-1 indent-1 italic '>{description}</p>

          {showCategories && (
            <div
              className='flex flex-row flex-wrap gap-1 p-2'
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
                className='prose prose-sm h-full p-1 indent-1 '
              ></div>
            )}
          </Spoiler>
        </div>
        <div className='flex flex-row justify-end space-x-2 p-2'>
          <div className='flex flex-row items-center space-x-2'>
            <p className='text-xs text-slate12'>
              by {data.user?.userName}
              <p className='text-xs italic text-slate12'>
                {dayjs(createdAt).format('MMM D')}
              </p>
            </p>
          </div>
        </div>
        <div className='flex flex-row flex-wrap items-center gap-2'>
          <div className='flex flex-row flex-wrap gap-2 p-2'>
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
                size='small'
                variant='unfilled'
                onClick={() => setOpen(!open)}
              >
                <div className='flex flex-row space-x-1 text-blue-500'>
                  <ChatBubbleIcon />
                  <p className='first-letter:subtitle2 text-blue-500'>
                    {' '}
                    {_count.comments}
                  </p>
                </div>
              </Button>
            )}
            {showShare && id && <ShareButton id={id} />}
          </div>
          {showOptions && currentUser?.id === userId && (
            <PostOptions postId={id} />
          )}
        </div>

        <Divider my={'7'} />

        {showComments && id && (
          <div className='mt-2 flex flex-col gap-2'>
            {currentUser && <FormComments postId={id} />}
            {/* if I remove the formatCOmments this works.  */}
            {open && data.comments && (
              <ListComments comments={data.comments || []} />
            )}
          </div>
        )}
      </div>
    </>
  )
}
