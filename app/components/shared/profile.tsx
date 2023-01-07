import type { About } from '@prisma/client'
import type { SerializeFrom } from '@remix-run/node'
import { Link } from '@remix-run/react'
import { useOptionalUser } from '~/utils/utils'

export type AboutProps = {
  about: Partial<SerializeFrom<About>>
}

export default function MyProfile({ about }: AboutProps) {
  const user = useOptionalUser()

  return (
    <article className='mx-auto mt-5 mb-5 flex min-h-full w-fit max-w-prose flex-col overflow-hidden rounded-md shadow-xl transition-shadow  duration-200 ease-in-out hover:shadow-2xl md:w-fit'>
      <h1 className='border-black my-3 border-b-2 text-left text-3xl'>
        {about.firstName} {about.lastName}, PhD
      </h1>
      <p className='mb-2 indent-4 text-sm italic'> {about.occupation}</p>

      <div className='flex flex-row gap-5'>
        <div className='h-full w-full'>
          <img
            src={about.profilePicture}
            style={{ height: '100%', width: '100%' }}
            alt='about'
          />
        </div>
        <div>
          <div className='mx-auto  flex max-w-prose  flex-row items-center space-x-4 md:w-fit'>
            <div>I live in {about.location}</div>
          </div>
        </div>
      </div>

      <div className='mx-auto max-w-prose break-before-auto p-2 indent-4 leading-6 md:w-fit md:p-4'>
        {about.bio}
      </div>

      {user?.userName === about.userName ? (
        <Link prefetch='intent' to={`/about/${about.id}`} className='flex'>
          <button type='button' className='btn-primary'>
            Edit
          </button>
        </Link>
      ) : null}
    </article>
  )
}
