import type { About } from '@prisma/client'
import { Pencil1Icon } from '@radix-ui/react-icons'
import type { SerializeFrom } from '@remix-run/node'
import { Link } from '@remix-run/react'
import { useOptionalUser } from '~/utils/utilities'
import Button from './button'

export type AboutProps = {
  about: Partial<SerializeFrom<About>>
}

export default function AboutMe({ about }: AboutProps) {
  const user = useOptionalUser()
  const isOwner = user?.id === about.userId
  return (
    <article className='flex w-[350px] flex-col items-center gap-4 p-1'>
      <h1 className='my-3 border-b-2 border-black text-left text-3xl'>
        {about.firstName} {about.lastName}, PhD
      </h1>
      <p className='mb-2 indent-4 text-sm italic'> {about.occupation}</p>

      <div className='flex flex-row gap-5'>
        <div className='h-full w-1/2'>
          <img
            src={about.profilePicture}
            className='h-full w-full shrink-0 object-cover'
            alt='about'
          />
        </div>
        <div className='flex w-1/2 flex-col justify-center'>
          <div className='prose'>
            <div>I live in {about.location}</div>
            <div>
              I am a {about.occupation} in {about.location}
            </div>
          </div>
        </div>
      </div>

      <div className='w-full '>
        {about.bio && (
          <div
            dangerouslySetInnerHTML={{ __html: about.bio }}
            className='prose'
          ></div>
        )}
      </div>
      <div className='flex flex-row justify-end'>
        {isOwner ? (
          <Link
            prefetch='intent'
            to={`/about/${about.id}/edit`}
            className='flex'
          >
            <Button type='button' variant='icon_unfilled' size='base'>
              <Pencil1Icon />
            </Button>
          </Link>
        ) : null}
      </div>
    </article>
  )
}
