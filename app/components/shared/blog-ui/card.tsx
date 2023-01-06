import { Post } from '.prisma/client'
import { SerializeFrom } from '@remix-run/node'
import { Form, Link, useFetcher, useMatches } from '@remix-run/react'
import { format } from 'date-fns'
import { useState } from 'react'
import { CommentAndUserData } from '~/models/comments.server'
import { SerializedPost, serializedQueriedPost } from '~/models/post.server'
import { useOptionalUser } from '~/utils/utils'
import CategoryContainer from '../category-container'
import CommentActionBox from '../comment/comment-actions'
import CommentBox from '../comment/comment-box'
import { UserPlaceHolder } from '../icons'
import PostOptions from '../post-options'
import BlogActions from './blog-actions'
import FavoriteContainer from './favorite-button'
import LikeContainer from './like-container'
import { ShareButton } from './share-button'

export type Props = {
  post: SerializedPost
}

export const Card = ({ post }: Props) => {
  const user = useOptionalUser()
  const parentData = useMatches().find((match) => match.pathname === '/blog')
    ?.data as CommentAndUserData[]

  const [comments] = parentData.comments

  const myComments = comments.map((c) => {
    return {
      id: c.id,
      message: c.message,
      postId: c.postId,
      parentId: c.parentId
    }
  })

  const [isOpen, setIsOpen] = useState(true)
  const fetcher = useFetcher()
  const [formData, setFormData] = useState({
    message: ''
  })

  const listItems = comments.map((i: any) => (
    <li key={i.id}>
      <div>{i.message}</div>
      <BlogActions commentId={i.id} postId={i.postId} />
    </li>
  ))

  return (
    <>
      <div
        key={post.id}
        className='max-w-prose rounded-lg p-2 shadow-2xl ring-indigo-300 hover:ring-1 dark:hover:ring-gray-400'
      >
        <div className='items- flex flex-row justify-between'>
          {' '}
          <h1 className='mh2'>{post.title}</h1>
          <Link className='hover:animate-pulse' to={`/users/${post.userId}`}>
            <div className='relative'>
              <p className='absolute left-2 text-xs text-white'>
                {post.createdBy?.[0]}
              </p>
              <img
                src={post.imageUrl}
                alt='avatar'
                className='h-10 w-10 rounded-full'
                style={{
                  height: '50px',
                  width: '50px',
                  objectFit: 'cover',
                  minWidth: '50px'
                }}
              />
            </div>
          </Link>
        </div>
        {post.categories ? (
          <CategoryContainer category={post.categories} />
        ) : null}
        <img
          src={post.imageUrl}
          alt='avatar'
          className='float-left mt-5 mb-5 h-10 w-10 rounded-full'
          style={{ height: '250px', width: '250px', objectFit: 'cover' }}
        />

        <div className='mt-10 flex flex-row pl-2 italic'>
          {post.description}
        </div>
        <div className='float-right mt-10 flex flex-row pl-2 italic'>
          <p>Published: </p>
          {format(new Date(post.createdAt), 'MMM dd ')}
        </div>
        <div className='float-right mt-10 flex flex-row pl-2 italic'>
          <p>Written by: </p>
          {post.createdBy}
        </div>

        <div className='clear-left indent-6 text-base'>{post.body}</div>
        <div className='flex flex-row items-center justify-end space-x-2'>
          {user && post.id ? (
            <div className='flex flex-row items-center justify-start'>
              <>
                <LikeContainer
                  post={post}
                  currentUser={user.id}
                  postId={post.id}
                />
                {/* not sure what's up with favs */}
                <FavoriteContainer
                  postId={post.id}
                  currentUser={user.id}
                  post={post.favorites}
                />
                <PostOptions id={post.id} published={post.published} />
              </>

              <ShareButton id={post.id} />
            </div>
          ) : (
            <div className='flex flex-row justify-between'>
              <div className='flex flex-row space-x-2'>
                Sign up or Register to comment, share, and like posts
              </div>
            </div>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className='flex flex-row space-x-2'
          >
            <span className='material-icons'>comment</span>
            {isOpen ? 'Close' : 'Comment'}
          </button>
        </div>
        {isOpen && (
          <div className='rounded-lg'>
            <fetcher.Form
              method='post'
              action={`/blog/${post.id}/comment`}
              className='flex flex-col items-end space-y-1'
            >
              <input type='hidden' name='userId' value={user?.id} />
              <input type='hidden' name='postId' value={post.id} />
              <input type='hidden' name='createdBy' value={user?.userName} />
              <textarea
                rows={1}
                cols={50}
                id='message'
                className='w-full rounded-md border border-blue-300 bg-zinc-200 text-zinc-900 dark:bg-zinc-400 dark:text-slate-200'
                name='message'
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
              />
              <button
                className='btn-base btn-solid-success w-fit'
                type='submit'
              >
                Save
                <span className='material-icons'>save</span>
              </button>
            </fetcher.Form>


          <CommentBox post={post} comments={comments} />


          </div>
        )}
      </div>


    </>
  )
}



export type CommentCardProps = {
  post: {
    postId: string
    title: string
    body: string
    message: string
    id: string
    comment: string
    createdAt: string
    updatedAt: string
    published: boolean
    userId: string
    userName: string
    description: string
    email: string
    imageUrl: string
    avatarUrl: string
  }
}[]

