import { format } from 'date-fns'
import type { SerializedPost } from '~/utils/schemas/post-schema'
import type { User } from '~/utils/schemas/user-schema'
import { Divider } from '../layout/divider'
import PostOptions from '../post-options'
import { CommentSection } from './comments-section'
import FavoriteContainer from './favorite-button'
import LikeContainer from './like-container'
import { ShareButton } from './share-button'

export type ManyPostProps = {
  post: SerializedPost
  user: User
}

export type BasicCardProps = {
  showLikes: boolean
  showFavorites: boolean
  showComments: boolean
  showShare: boolean
  showOptions: boolean
} & ManyPostProps

export const Card = ({
  post,
  user,
  showComments,
  showLikes,
  showFavorites,
  showShare,
  showOptions
}: BasicCardProps) => {
  const users = user?.userName
  console.log(users, 'users')
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
    comments,
    likes,
    _count
  } = post
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
            className='block w-full scale-125 transform overflow-hidden object-center p-0 transition duration-200 ease-in-out'
            alt={title}
          />
        </div>

        <div></div>
        <div className='pt-4 text-xs'>
          <p className='indent-2 text-xs italic'>{description}</p>
          <p className='text-xs'>{body}</p>
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
                currentUser={user?.id}
              />
            )}

            {showFavorites && id && (
              <FavoriteContainer
                postId={id}
                post={post}
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
          </div>

          {user ? (
            post && user.avatarUrl ? (
              <div className='block w-1/2'>
                <AvatarCircle
                  avatarUrl={user.avatarUrl}
                  userName={user.userName}
                  createdBy={createdBy}
                  createdAt={createdAt}
                  updatedAt={updatedAt}
                />
              </div>
            ) : null
          ) : null}
        </div>
        <Divider></Divider>
        {showComments && (
          <CommentSection comments={comments} postComments={_count.comments}  postId={id}/>
        )}
      </div>
    </>
  )
}

export function AvatarCircle({
  avatarUrl,
  userName,
  createdBy,
  createdAt,
  updatedAt
}: {
  avatarUrl: string
  userName: string
  createdBy: string | undefined
  createdAt: string | Date | undefined
  updatedAt: string | Date | undefined
}) {
  return (
    <div className='flex flex-row items-center justify-end'>
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt={userName}
          className='h-6 w-6 rounded-full'
          style={{ width: '1.5rem', height: '1.5rem' }}
        />
      ) : null}
      <div className='text-right text-xs'>
        {createdBy && (
          <>
            <p className='italic'>Written by: {createdBy}</p>
          </>
        )}
        {createdAt && (
          <span className='inline-flex space-x-1'>
            {' '}
            <p className='italic'>Posted:</p>{' '}
            <p>{format(new Date(createdAt), 'MMM dd yy')}</p>
          </span>
        )}
        {updatedAt && (
          <p className='italic'>
            Updated: {format(new Date(updatedAt), 'MMM dd yy')}
          </p>
        )}
      </div>
    </div>
  )
}

// function CommentField(){
//   return (
//     {isOpen && (
//       <div className='rounded-lg'>
//         <fetcher.Form
//           method='post'
//           action={`/blog/${post.id}/comment`}
//           className='flex flex-col items-end space-y-1'
//         >
//           <input type='hidden' name='userId' value={user?.id} />
//           <input type='hidden' name='postId' value={post.id} />
//           <input type='hidden' name='createdBy' value={user?.userName} />
//           <textarea
//             rows={1}
//             cols={50}
//             id='message'
//             className='border-blue-300 bg-zinc-200 text-zinc-900 dark:bg-zinc-400 dark:text-slate-200 w-full rounded-md border'
//             name='message'
//             value={formData.message}
//             onChange={(e) =>
//               setFormData({ ...formData, message: e.target.value })
//             }
//           />
//           <button
//             className='btn-base btn-solid-success w-fit'
//             type='submit'
//           >
//             Save
//             <span className='material-icons'>save</span>
//           </button>
//         </fetcher.Form>

//       </div>
//     )}
//   )
// }
