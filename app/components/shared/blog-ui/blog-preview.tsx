import type { PostWOComments } from '~/utils/schemas/post-schema'
import Tags from './tags'
import { NavLink } from '@remix-run/react'
import LikeContainer from './like-container'
import { useOptionalUser } from '~/utils/utilities'
import FavoriteContainer from './favorite-container'
import { ShareButton } from './share-button'
import Actions from './blog-actions'

export default function BlogPreview({
  post,
  showActions
}: {
  post: PostWOComments
  showActions?: boolean
}) {
  const user = useOptionalUser()

  const currentUser = user?.id || ''

  return (
    <div className='flex w-full flex-col border-2 p-2 shadow-xl'>
      {/* Card header */}
      <div className='flex'>
        <NavLink to={`/blog/${post.id}`}>
          <h1 className='text-lg font-bold uppercase'>{post.title}</h1>
        </NavLink>
      </div>
      {/* card content and image */}
      <div className=' flex w-fit flex-col gap-2 '>
        <div className='flex w-full'>
          <img
            src={post.imageUrl}
            alt={post.title}
            className='h-20 w-52 object-cover'
          />

          <p className='prose text-sm italic'>{post.description}</p>
        </div>
        <div className='w flex flex-col justify-between gap-4'></div>
        <Tags categories={post.categories} />
      </div>

      {/* card footer */}
      <div className='flex flex-row gap-2'>
        <LikeContainer
          postId={post.id}
          likes={post.likes}
          likeCounts={post.likes.length}
          currentUser={currentUser}
        />
        <FavoriteContainer
          postId={post.id}
          favorites={post.favorites}
          currentUser={currentUser}
        />
        <ShareButton id={post.id} />

        <p>{post.user.userName}</p>
      </div>
      {/* card actions */}
      {showActions && <Actions postId={post.id} />}
    </div>
  )
}
