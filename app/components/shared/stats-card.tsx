import { useOptionalUser } from '~/utils/utilities'

export default function StatsCard() {
  const user = useOptionalUser()
  return (
    <>
      {user && (
        <div className='flex w-full flex-col items-center justify-center'>
          <div className='flex h-full w-full flex-row items-center justify-center gap-3'>
            <p className='text-gray-600 dark:text-gray-400 text-sm'>
              Welcome, {user.userName}
            </p>
          </div>
          <div className='flex flex-row items-center gap-3'>
            <div className='flex items-center gap-3'>
              <h3 className='text-gray-600 dark:text-gray-400 text-sm'>
                Favorited Posts
              </h3>
              <div className='flex w-[24px] justify-center rounded-full bg-crimson8'>
                <p className='text-black dark:text-white'>
                  {user._count.favorites}
                </p>
              </div>
            </div>
            <h3 className='text-gray-600 dark:text-gray-400 text-sm'>
              Liked Posts
            </h3>
            <div className='flex w-[24px] justify-center rounded-full bg-crimson8'>
              <p className='text-black dark:text-white'>{user._count.likes}</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
