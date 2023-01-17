import type { LoaderArgs} from '@remix-run/node';
import { json, Response } from '@remix-run/node'
import { useCatch, useMatches, useParams } from '@remix-run/react'
import invariant from 'tiny-invariant'
import type { Profile } from '~/models/profile.server';
import { getProfiles, getUserProfile } from '~/models/profile.server'
import { getUserById } from '~/models/user.server'

export async function loader({ params, request }: LoaderArgs) {
  const userId = params.userId
  invariant(userId, 'userId is required')
  const users = await getUserById(userId)
  const profiles = await getProfiles()
  const userProfile = await getUserProfile(userId)

  const profile = profiles.find((profile) => profile.userId === userId)
  if (!profile) throw new Response('Profile not found', { status: 404 })

  return json({
    profiles,
    user: users,
    profile: userProfile,

  })
}

export default function UserProfileRoute() {
  const parentData = useMatches().find((match) => match.pathname === '/users')
    ?.data as {
    profiles: Array<Profile>
  }

  const params = useParams()
  const profile = parentData?.profiles.find(
    (pro) => pro.userId === params.userId
  )

  if (!profile) {
    throw new Error('Profile not found')
  }
  return (
    <div>
      {
        profile && <>
          <div className='flex flex-col items-center'
            key={profile.id}>
            <div className='flex flex-col items-center'>
              <img
                className='rounded-full w-32 h-32'
                src={profile?.profilePicture}
                alt={profile.userName}
              />
              <h1 className='text-2xl font-bold'>{profile.userName}</h1>
              </div>
              </div>
        </>
      }
    </div>
  )
}

export function CatchBoundary() {
  const caught = useCatch()
  const params = useParams()
  if (caught.status === 404) {
    return <div>Profile with ID {params.userId} not found</div>
  }
  throw new Error(`unexpected caught response with status: ${caught.status}`)
}
