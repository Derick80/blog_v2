import { About } from '@prisma/client'
import { SerializeFrom } from '@remix-run/node'
import { Link } from '@remix-run/react'
import { useOptionalUser } from '~/utils/utils'

export type AboutProps = {
  about: SerializeFrom<About>
}

export default function MyProfile({ about }: AboutProps) {
  const user = useOptionalUser()

  return (
    <div>
      <div>
        <h1 className='my-3 border-b-2 text-left text-3xl'>
          {about.firstName} {about.lastName}{' '}
        </h1>
        <p className='text-sm italic'> {about.occupation}</p>

        <div className='flex flex-row gap-5'>
          <div className='h-1/2 w-1/2'>
            {' '}
            <img src={about.profilePicture} alt='about' />
          </div>
          <div>
            <label className='text-lg font-medium'>About Me</label>
            <div>{about.bio}</div>
          </div>
        </div>
        <div></div>
        {user?.userName === about.userName ? (
          <Link prefetch='intent' to={`/about/${about.id}`} className='flex'>
            <button type='button' className='btn-primary'>
              Edit
            </button>
          </Link>
        ) : null}
      </div>
    </div>
  )
}
