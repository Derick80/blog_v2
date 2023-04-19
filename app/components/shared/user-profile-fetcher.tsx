import { useFetcher } from '@remix-run/react'
import React from 'react'
import type { Profile } from '~/utils/schemas/profile-schema'

export default function UserProfileFetcher({ userName }: { userName: string }) {
  const fetcher = useFetcher()

  // might need to revisit this in v2
  React.useEffect(() => {
    if (fetcher.state === 'idle') {
      fetcher.load(`/users/${userName}`)
    }
  }, [])

  const profile = fetcher?.data?.user.profile

  return (
    <>
      {profile &&
        profile.map((profiles: Profile) => (
          <div className='items-censter flex flex-col' key={profile.id}>
            <p className='text-sm font-semibold'>email: {profiles?.email}</p>
            <p className='text-sm font-semibold'>bio: {profiles.bio}</p>
            <p className='text-sm font-semibold'>
              location: {profiles?.location}
            </p>

            <div></div>
          </div>
        ))}
    </>
  )
}
