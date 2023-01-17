/* eslint-disable react/no-danger-with-children */
import { Category } from 'aws-sdk/clients/signer'
import { format } from 'date-fns'
import type {
  SerializedEditPost,
  Post,
  SerializedPost
} from '~/utils/schemas/post-schema'
import type { User } from '~/utils/schemas/user-schema'
import { Divider } from '../layout/divider'
import PostOptions from './post-options'
import { CommentSection } from './comments-section'
import FavoriteContainer from './favorite-container'
import LikeContainer from './like-container'
import { ShareButton } from './share-button'
import type { Comment } from '~/utils/schemas/comment-schema'
import PostUserInfo from './avatar-circle'
import { Favorite } from '~/utils/schemas/favorite.schema'
import { Link } from '@remix-run/react'
import { IconMessage2 } from '@tabler/icons'
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

export const Card = ({
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
    createdAt,
    updatedAt,
    published,
    createdBy,
    likes,
    _count,
    favorites,
    comments,
    users
  } = data

  function CardHeader() {
    return (
      <>
        <div className='flex flex-col justify-between md:flex-row'>
          <div className='flex flex-col'>
            <Link
              to={`/blog/${id}`}
              className='text-gray-900 text-lg font-bold'
            >
              <h3 className='text-xl font-bold capitalize'>{title}</h3>
            </Link>
            <p className='indent-2 text-xs italic'>{description}</p>
          </div>
          <div className='flex flex-col'>
            <div className='flex flex-row items-center justify-around'>
              {user?.avatarUrl && (
                <>
                  <p className='text-xs'>by:</p>
                  <img
                    src={user?.avatarUrl}
                    alt={user?.userName}
                    className='h-6 w-6 rounded-full'
                    style={{ width: '1.5rem', height: '1.5rem' }}
                  />
                  <p className='text-xs italic'>{user?.userName}</p>
                </>
              )}
            </div>
            <div>
              <p className='text-xs italic'>
                {format(new Date(createdAt), 'MMMM dd, yyyy')}
              </p>
            </div>
          </div>
        </div>
      </>
    )
  }

  function CardBody() {
    return (
      <>
        {imageUrl && (
          <>
            <img
              src={imageUrl}
              alt={title}
              className='h-64 w-full object-cover'
            />
          </>
        )}
        {body && (
          <p dangerouslySetInnerHTML={{ __html: body }} className='text-xs'></p>
        )}
      </>
    )
  }

  function CardFooter() {
    return (
      <>
        <div className='flex flex-row'>
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

          <div className='flex flex-row items-center justify-around'>
            <IconMessage2 size={20} stroke={1.5} />
            <p className='pt-5 text-xs'>{_count.comments}</p>
          </div>
        </div>
      </>
    )
  }
  return (
    <>
      <div key={id} className='flex flex-col'>
        {/* flex-row header container */}
        <CardHeader />
        <CardBody />
        <div className='pt-4 text-xs'></div>

        <div className='relative flex flex-row justify-between'></div>
        <CardFooter />
        <Divider></Divider>
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
