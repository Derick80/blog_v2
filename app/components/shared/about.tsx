import type { About } from '@prisma/client'
import { GlobeIcon, Pencil1Icon, PersonIcon } from '@radix-ui/react-icons'
import type { SerializeFrom } from '@remix-run/node'
import { Link } from '@remix-run/react'
import { useOptionalUser } from '~/utils/utilities'

export type AboutProps = {
  about: Partial<SerializeFrom<About>>
}

export default function AboutCard({ about }: AboutProps) {
  const user = useOptionalUser()
  const isOwner = user?.id === about.userId
  return (
    <article className='mx-auto mt-5 mb-5 flex  w-fit max-w-prose flex-col rounded-md shadow-xl transition-shadow  duration-200 ease-in-out hover:shadow-2xl md:w-fit'>
      <h1 className='my-3 border-b-2 border-black text-left text-3xl'>
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
        <div></div>
      </div>

      <div className='w-full '>
        <div className='mx-auto  flex max-w-prose  flex-row items-center space-x-4 md:w-fit'>
          <GlobeIcon /> <div>{about.location}</div>
        </div>
        {about.bio && (
          <div className='items-star mx-auto flex  max-w-prose flex-row space-x-4 md:w-fit'>
            <PersonIcon />
            <div
              dangerouslySetInnerHTML={{ __html: about.bio }}
              className='prose prose-sm h-full dark:prose-invert'
            ></div>
          </div>
        )}
      </div>
      <div className='flex flex-row justify-end'>
        {isOwner ? (
          <Link
            prefetch='intent'
            to={`/about/${about.id}/edit`}
            className='flex'
          >
            <button type='button' className='btn-primary'>
              <Pencil1Icon />
            </button>
          </Link>
        ) : null}
      </div>
    </article>
  )
}
