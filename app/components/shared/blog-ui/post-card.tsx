/* eslint-disable react/no-danger-with-children */
import { format } from 'date-fns'
import type {
  SerializedEditPost,
  SerializedPost
} from '~/utils/schemas/post-schema'
import type { User } from '~/utils/schemas/user-schema'
import { Divider } from '../layout/divider'
import PostOptions from './post-options'
import { CommentSection } from './comments-section'
import FavoriteContainer from './favorite-container'
import LikeContainer from './like-container'
import { ShareButton } from './share-button'
import type {
  Comment,
  CommentWithChildren
} from '~/utils/schemas/comment-schema'
import type { Favorite } from '~/utils/schemas/favorite.schema'
import { Link } from '@remix-run/react'
import { IconMessage, IconMessage2 } from '@tabler/icons'
import CategoryContainer from '../category-container'
import { AspectRatio, Image } from '@mantine/core'
import { Like } from '~/utils/schemas/like-schema'
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
    favorites,
    comments
  } = data

  function CardHeader() {
    return (
      <>
        <div className='flex flex-col justify-between p-2 md:flex-col'>
          <div className='flex flex-col'>
            <Link
              to={`/blog/${id}`}
              className='text-gray-900 text-lg font-bold'
            >
              <h3 className='text-xl font-bold capitalize'>{title}</h3>
            </Link>

            {imageUrl && (
              <div className='flex w-full gap-3'>
                <div style={{ width: 240, marginRight: 'auto' }}>
                  <Image src={imageUrl} alt={title} radius='md' />
                </div>
                <div className='flex flex-col justify-between p-2 md:flex-col'>
                  {body && (
                    <p
                      dangerouslySetInnerHTML={{ __html: body }}
                      className='prose prose-sm h-full'
                    ></p>
                  )}{' '}
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
                </div>
              </div>
            )}

            <p className='text-sm italic'>{description}</p>
          </div>
        </div>
      </>
    )
  }

  function CardFooter() {
    return (
      <>
        <div className='flex flex-row justify-between p-2'>
          <div className='flex flex-row items-center space-x-1'>
            {/* this is where likes, comments, etc should go */}
            {showLikes && id && likes && _count && user && (
              <LikeContainer
                postId={id}
                likes={likes}
                likeCounts={_count?.likes}
                currentUser={user.id}
              />
            )}

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

            {showComments && (
              <div className='flex flex-row items-center justify-around'>
                <IconMessage />
                <p className='pt-5 text-xs'>{_count.comments}</p>
              </div>
            )}
          </div>
          <div className='flex flex-col'>
            <div className='flex flex-row items-center space-x-1'>
              {user?.avatarUrl && (
                <>
                  <p className='text-xs'>Posted by</p>
                  <img
                    src={user?.avatarUrl}
                    alt={user?.userName}
                    className='h-6 w-6 rounded-full'
                    style={{ width: '1.5rem', height: '1.5rem' }}
                  />
                </>
              )}
            </div>
            <div className='flex space-x-1'>
              <p className='text-xs italic'>{user?.userName}</p>
              <p className='text-xs italic'>on </p>
              <p className='text-xs italic'>
                {format(new Date(createdAt), 'MMMM dd')}
              </p>
            </div>
          </div>
        </div>
      </>
    )
  }
  return (
    <>
      <div
        key={id}
        className='m-2 mb-10 flex w-fit flex-col overflow-auto rounded-lg shadow-xl'
      >
        <CardHeader />
        <CardFooter />

        {showComments && comments && id && (
          <CommentSection
            comments={comments}
            postComments={_count.comments}
            postId={id}
          />
        )}
      </div>
    </>
  )
}
