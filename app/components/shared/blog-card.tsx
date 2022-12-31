import { Post } from '@prisma/client'
import { Link } from '@remix-run/react'

export type BlogCardProps = {
  posts: Post
}

export const BlogCard = ({ posts }: BlogCardProps) => {
  return (
    <>
      <article
        key={posts.id}
        className='relative flex min-h-full max-w-prose flex-col overflow-hidden rounded-md border border-black transition-shadow duration-200 ease-in-out'
      >
        <h3 className='block text-2xl font-semibold leading-10 '>
          <Link prefetch='intent' to={`/posts/${posts.id}`}>
            {posts.title}
          </Link>
        </h3>
        <div className='h-40 md:h-60'>
          {posts.imageUrl && (
            <img
              src={posts.imageUrl}
              alt={posts.title}
              className='h-full w-full object-cover'
            />
          )}
        </div>
        <div className='flex grow flex-col p-4'>
          <p className='mt-2 indent-4 md:mt-4 md:text-lg md:leading-7'>
            {posts.description}{' '}
          </p>
          <div className='flex-grow'>{posts.body}</div>
        </div>
      </article>
    </>
  )
}
