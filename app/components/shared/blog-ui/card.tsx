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
import FavoriteContainer from './favorite-button'
import LikeContainer from './like-container'
import { ShareButton } from './share-button'
import type { Comment } from '~/utils/schemas/comment-schema'
import PostUserInfo from './avatar-circle'
export type ManyPostProps = {
  data: Post & {
    comments: Comment[]
  }
  user: User | null
}

export type EditPostCardProps = {
  data: SerializedEditPost
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
  const currentUserName = user?.userName || ''
  return (
    <>
      {' '}
      <div
        key={id}
        className='ring-indigo-300 border-bg-crimson6 shadow-3xl flex max-w-prose flex-col overflow-hidden rounded-lg border-2 p-2 hover:ring-1 dark:bg-crimson2 dark:hover:bg-crimson4'
      >
        <div className='mb-2 p-2 pb-0 text-2xl'>
          {title}

          <img
            src={imageUrl}
            className='block w-full transform overflow-hidden object-center p-0 transition duration-200 ease-in-out'
            alt={title}
          />
        </div>

        <div></div>
        <div className='pt-4 text-xs'>
          <p className='indent-2 text-xs italic'>{description}</p>

          {body && (
            <p
              dangerouslySetInnerHTML={{ __html: body }}
              className='text-xs'
            ></p>
          )}
        </div>
        <Divider></Divider>
        <div className='relative flex flex-row justify-between'>
          <div className='flex flex-row'>
            {/* this is where likes, comments, etc should go */}
            {showLikes && id && likes && _count && (
              <LikeContainer
                postId={id}
                likes={likes}
                likeCounts={_count?.likes}
                currentUser={currentUserName}
              />
            )}

            {showFavorites && id && (
              <FavoriteContainer
                postId={id}
                post={favorites}
                currentUser={currentUserName}
              />
            )}

            {showShare && id && <ShareButton id={id} />}
            {showOptions && id && (
              <PostOptions
                id={id}
                published={published === true ? true : false}
              />
            )}
          </div>

         <PostUserInfo
            avatarUrl={user?.avatarUrl || ''}
            userName={user?.userName || ''}
            createdBy={createdBy}
            createdAt={createdAt}
            updatedAt={updatedAt}
          />

        </div>
        <Divider></Divider>
        {showComments && (
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
