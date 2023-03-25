import { UserType } from '~/utils/schemas/user-schema'
import { useOptionalUser, useUser } from '~/utils/utilities'

export default function StatsCard() {
  const user = useOptionalUser()
  if (!user) return null

  return (
    <div className='flex flex-row justify-center gap-2 rounded border-2 border-slate-50'>
      <div className='flex w-fit flex-col items-center gap-1'>
        <p className='subtitle2 text-slate-50'>Posts</p>
        <p className='subtitle2 text-slate-50'>{user._count.posts}</p>
      </div>
      <div className='flex w-fit flex-col items-center gap-1'>
        <p className='subtitle2 text-slate-50'>Likes</p>
        <p className='subtitle2 text-slate-50'>{user._count.likes}</p>
      </div>
      <div className='flex w-fit flex-col items-center gap-1'>
        <p className='subtitle2 text-slate-50'>Favorites</p>
        <p className='subtitle2 text-slate-50'>{user._count.favorites}</p>
      </div>
      <div className='flex w-fit flex-col items-center gap-1'>
        <p className='subtitle2 text-slate-50'>Comments</p>
        <p className='subtitle2 text-slate-50'>{user._count.comments}</p>
      </div>
      <div className='flex w-fit flex-col items-center gap-1'>
        <p className='subtitle2 text-slate-50'>Reviews</p>
        <p className='subtitle2 text-slate-50'>{user._count.books}</p>
      </div>
    </div>
  )
}
