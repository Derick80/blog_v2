import { useOptionalUser } from '~/utils/utilities'

export default function StatsCard() {
  const user = useOptionalUser()
  return (
    <>
      {user && (
        <div className='flex h-full w-full flex-col items-center justify-center'>
          <div className='flex h-full w-full flex-row items-center justify-center gap-3'>
            <h3 className='text-gray-600 dark:text-gray-400 text-sm'>
              Welcome,
            </h3>
            <p className='text-gray-600 dark:text-gray-400 text-sm'>
              {user.userName}
            </p>
          </div>
          <div className='flex h-full w-full flex-row items-center justify-center gap-3'>
            <div className='flex h-full w-full flex-row items-center justify-center gap-3'>
              <h3 className='text-gray-600 dark:text-gray-400 text-sm'>
                Favorited Posts
              </h3>
              <p>{user._count.favorites}</p>
            </div>
            <div className='flex h-full w-full flex-row items-center justify-center gap-3'>
              <h3 className='text-gray-600 dark:text-gray-400 text-sm'>
                Liked Posts
              </h3>
              <p>{user._count.likes}</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
