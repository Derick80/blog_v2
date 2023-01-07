import { format } from 'date-fns'
import type { SerializedPost } from '~/models/post.server'
import type { Post } from '~/utils/schemas/post-schema'
import type { User, UserType } from '~/utils/schemas/user-schema'
import { Divider } from '../layout/divider'
import PostOptions from '../post-options'
import CommentForm from './comment-form'
import FavoriteContainer from './favorite-button'
import LikeContainer from './like-container'
import ListComments from './list-comments'
import { ShareButton } from './share-button'

export type ManyPostProps = {
  post: Post
  user: User
}

export type BasicCardProps = {
  showLikes?: boolean
  showFavorites?: boolean
  showComments?: boolean
  showShare?: boolean
  showOptions?: boolean
} & (ManyPostProps | { post: SerializedPost; user: UserType })

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

  return (
    <>
      {' '}
      <div
        key={post.id}
        className='ring-indigo-300 border-bg-crimson6 shadow-3xl flex max-w-prose flex-col overflow-hidden rounded-lg border-2 p-2 hover:ring-1 dark:bg-crimson2 dark:hover:bg-crimson4'
      >
        <div className='mb-2 p-2 pb-0 text-2xl'>
          {post.title}

          <img
            src={post.imageUrl}
            className='block w-full scale-125 transform overflow-hidden object-center p-0 transition duration-200 ease-in-out'
            alt={post.title}
          />
        </div>

        <div></div>
        <div className='pt-4 text-xs'>
          <p className='indent-2 text-xs italic'>{post.description}</p>
          <p className='text-xs'>{post.body}</p>
        </div>
        <Divider></Divider>
        <div className='relative flex flex-row justify-between'>
          <div className='flex flex-row'>
            {/* this is where likes, comments, etc should go */}
            {showLikes && post.id && post.likes && (
              <LikeContainer
                postId={post.id}
                likes={post.likes}
                likeCounts={post._count?.likes}
                currentUser={user?.id}
              />
            )}

            {showFavorites && post.id && (
              <FavoriteContainer
                postId={post.id}
                post={post}
                currentUser={user?.id}
              />
            )}

            {showShare && post.id && <ShareButton id={post.id} />}
            {showOptions && post && <PostOptions post={post} />}
          </div>

          {user ? (
            post ? (
              <AvatarCircle
                avatarUrl={user?.avatarUrl}
                userName={user?.userName}
                createdBy={post?.createdBy}
                createdAt={post?.createdAt}
                updatedAt={post?.updatedAt}
              />
            ) : null
          ) : null}
        </div>
        {showComments && <ListComments comments={post.comments} />}
        <CommentForm />
      </div>
    </>
  )
}

function AvatarCircle({
  avatarUrl,
  userName,
  createdBy,
  createdAt,
  updatedAt
}: {
  avatarUrl: string
  userName: string
  createdBy: string
  createdAt: string
  updatedAt: string
}) {
  return (
    <div className='flex flex-row'>
      <img
        src={avatarUrl}
        alt={userName}
        className='h-6 w-6 rounded-full'
        style={{ width: '2rem', height: '2rem' }}
      />
      <div className='text-xs'>
        <p>
          written by {createdBy} on{' '}
          {createdAt ? <> {format(new Date(createdAt), 'PPpp')}</> : null}
        </p>
        {updatedAt && <p>updated: {format(new Date(updatedAt), 'PPpp')}</p>}
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
