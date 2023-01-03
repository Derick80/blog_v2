import { Comment } from '@prisma/client'
import { Link, useNavigate } from '@remix-run/react'
import { useState } from 'react'
import type { serializedQueriedPost } from '~/models/post.server'
import { useOptionalUser } from '~/utils/utils'
import Comment from './comment/comment'
import CommentForm from './comment/comment-form'
import CommentList from './comment/comment-list'
import FavoriteContainer from './favorite-button'
import { ImagePlaceHolder } from './icons'
import LikeContainer from './like-container'
import PostOptions from './post-options'
import { ShareButton } from './share-button'

export type BlogCardProps = {
  posts: serializedQueriedPost
  rootComments:
}

export const BlogCard = ({ posts, rootComments }: BlogCardProps) => {
  const user = useOptionalUser()
  const [formData, setFormData] = useState({
    message: ''
  })
  return (
    <>
      <div
        key={posts.id}
        className='mt-5 mb-5 flex min-h-full max-w-prose flex-col overflow-hidden rounded-md shadow-xl transition-shadow  duration-200 ease-in-out hover:shadow-2xl md:w-fit'
      >
        <h3 className='block text-2xl font-semibold leading-10 '>
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
          <section>
             {rootComments !== null && rootComments.length > 0 && (
                <div className='mt-4'>
                  <CommentList rootComments={rootComments} />
                </div>
                  )}
             </section>
        </div>

        {user && posts.id ? (
          <div className='flex flex-col justify-between'>
            <div className='flex flex-row items-center justify-end'>
              <LikeContainer
                post={posts}
                currentUser={user.id}
                postId={posts.id}
              />
              <FavoriteContainer postId={posts.id} currentUser={user.id} />

              <ShareButton id={posts.id} />

              <div>

                  <span className='material-symbols-outlined'>comment</span>
                  <span className='min-w-[0.75rem] text-xs'>
                    {posts._count.comments || 0}
                  </span>
              </div>


                <CommentForm postId={posts.id} action='comment' />

              <PostOptions>
                <CardActions id={posts.id} published={posts.published} />
              </PostOptions>


            </div>
          </div>
        ) : (
          <div className='flex flex-row justify-between'>
            <div className='flex flex-row space-x-2'>
              Sign up or Register to comment, share, and like posts
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export type CardActionProps = {
  id: string
  published: boolean | null | undefined
}

function CardActions({ id, published }: CardActionProps) {
  return (
    <div className='flex flex-col justify-start'>
      <div className='flex flex-col justify-center space-y-2'>
        {published ? (
          <Link
            className='btn-base btn-solid-warn'
            to={`/blog/${id}/unpublish`}
          >
            Unpublish
          </Link>
        ) : (
          <div>
            <Link
              className='btn-base btn-solid-success'
              to={`/blog/${id}/publish`}
            >
              Publish
            </Link>
          </div>
        )}
        <Link className='btn-base btn-solid-warn' to={`/blog/${id}/edit`}>
          Edit
        </Link>
        <Link className='btn-base btn-solid-danger' to={`/blog/${id}/archive`}>
          Delete
        </Link>
      </div>
    </div>
  )
}
