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

        <h1 className='my-3 border-b-2 border-black text-left text-3xl'>
          {about.firstName} {about.lastName}, PhD
        </h1>
        <p className='text-sm italic mb-2 indent-4'> {about.occupation}</p>

        <div className='flex flex-row gap-5'>
          <div className='h-full w-full'>
            <img
              src={about.profilePicture}
              style={{ height: '100%', width: '100%' }}
              alt='about'
            />
          </div>
          <div>
            <div className='mx-auto  flex flex-row  max-w-prose items-center space-x-4 md:w-fit'>
              <div>I live in {about.location}</div>
            </div>
          </div>
        </div>



          <div className='p-2 md:p-4 mx-auto max-w-prose leading-6 indent-4 break-before-auto md:w-fit'>{about.bio}</div>

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
