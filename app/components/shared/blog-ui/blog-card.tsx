import { Link, useFetcher } from '@remix-run/react'
import { useState } from 'react'
import type { ReturnedPost, serializedQueriedPost } from '~/models/post.server'
import { useOptionalUser } from '~/utils/utils'
import FavoriteContainer from './favorite-button'
import { ImagePlaceHolder } from '../icons'
import LikeContainer from './like-container'
import PostOptions from '../post-options'
import { ShareButton } from './share-button'
import BlogActions from './blog-actions'
import CommentActionBox from '../comment/comment-actions'

export type BlogCardProps = {
  posts: ReturnedPost
}

export const BlogCard = ( posts: BlogCardProps) => {
  const user = useOptionalUser()
  const fetcher = useFetcher()
  const [formData, setFormData] = useState({
    message: ''
  })
  return (
    <>
      <div
        key={posts.id}
        className='mt-5 mb-5 flex min-h-full max-w-prose flex-col overflow-hidden rounded-md shadow-xl transition-shadow  duration-200 ease-in-out hover:shadow-2xl md:w-fit'
      >
        <h3 className='mh3'>
          <Link prefetch='intent' to={`/blog/${posts.id}`}>
            {posts.title}
          </Link>
        </h3>
        <div className='h-40 md:h-60'>
          {posts.imageUrl ? (
            <img
              src={posts.imageUrl}
              alt={posts.title}
              className='h-full w-full object-cover'
            />
          ) : (
            <>
              <ImagePlaceHolder />
            </>
          )}
        </div>
        <div className='flex grow flex-col p-4'>
          <p className='mt-2 indent-4 md:mt-4 md:text-lg md:leading-7'>
            {posts.description}{' '}
          </p>
          <article className='flex-grow'>{posts.body}</article>
          <section></section>
        </div>

        {user && posts.id ? (
          <div className='flex flex-row items-center justify-start'>
            <LikeContainer
              post={posts}
              currentUser={user.id}
              postId={posts.id}
            />
            <FavoriteContainer postId={posts.id} currentUser={user.id} />

            <ShareButton id={posts.id} />

            <div>
              <span className='material-symbols-outlined'>comment</span>
            </div>

            <PostOptions>
              <BlogActions id={posts.id} published={posts.published} />
            </PostOptions>
          </div>
        ) : (
          <div className='flex flex-row justify-between'>
            <div className='flex flex-row space-x-2'>
              Sign up or Register to comment, share, and like posts
            </div>
          </div>
        )}

        <fetcher.Form
          method='post'
          action={`/blog/${posts.id}/comment`}
          className='flex flex-col justify-center '
        >
          <label htmlFor='message'>Comment</label>
          <textarea
            id='message'
            className='rounded-md border border-gray-300 bg-slate-200 text-zinc-900 dark:bg-zinc-600 dark:text-slate-200'
            name='message'
            rows={3}
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
          />
          <button type='submit'>Save</button>
        </fetcher.Form>

        <div></div>
      </div>
    </>
  )
}
