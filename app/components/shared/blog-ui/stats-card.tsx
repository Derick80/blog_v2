import { UserType } from '~/utils/schemas/user-schema'
import { useOptionalUser, useUser } from '~/utils/utilities'

export default function StatsCard() {
  const user = useOptionalUser()
  if (!user) return null

  return (
    <div className='flex flex-row justify-center gap-2 rounded border-2 border-slate-50'>
      <div className='flex w-fit flex-col items-center gap-1'>
        <p className='subtitle2 text-black'>Posts</p>
        <p className='subtitle2 text-black'>{user._count.posts}</p>
      </div>
      <div className='flex w-fit flex-col items-center gap-1'>
        <p className='subtitle2 text-black'>Likes</p>
        <p className='subtitle2 text-black'>{user._count.likes}</p>
      </div>
      <div className='flex w-fit flex-col items-center gap-1'>
        <p className='subtitle2 text-black'>Favorites</p>
        <p className='subtitle2 text-black'>{user._count.favorites}</p>
      </div>
      <div className='flex w-fit flex-col items-center gap-1'>
        <p className='subtitle2 text-black'>Comments</p>
        <p className='subtitle2 text-black'>{user._count.comments}</p>
      </div>
      <div className='flex w-fit flex-col items-center gap-1'>
        <p className='subtitle2 text-black'>Reviews</p>
        <p className='subtitle2 text-black'>{user._count.books}</p>
      </div>
    </div>
  )
}
