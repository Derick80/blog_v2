import { useFetcher } from '@remix-run/react'
import React from 'react'
import { useMatchesData, useOptionalUser, useUser } from '~/utils/utilities'

export default function StatsCard() {
  const user = useOptionalUser()
  const draftsFetcher = useFetcher(

  )

  React.useEffect(() => {
    if (draftsFetcher.type === "init") {
      draftsFetcher.load("/drafts")
    }
  }, [draftsFetcher]);

  console.log(draftsFetcher.data, 'drafts');


  return (
    <>
      {user && (
        <>
          <h3 className='flex gap-1 text-sm text-black dark:text-slate-50'>
            Welcome, {user.userName}
          </h3>
          <ul className='mt-5 flex flex-row items-center gap-3'>
            <li className='flex flex-col items-center gap-3'>
              <h3 className='text-sm text-black dark:text-slate-50'>
                Favorited Posts
              </h3>
              <div className='flex w-[24px] justify-center rounded-full bg-crimson8'>
                <p className='text-base text-slate-50'>
                  {user._count.favorites}
                </p>
              </div>
            </li>
            <li className='flex flex-col items-center gap-3'>
              <h3 className='text-base text-black dark:text-slate-50'>
                Liked Posts
              </h3>
              <div className='flex w-[24px] justify-center rounded-full bg-crimson8'>
                <p className='text-slate-50'>{user._count.likes}</p>
              </div>
            </li>
            <li className='flex flex-col items-center gap-3'>
              <h3 className='text-base text-black dark:text-slate-50'>
                # of posts
              </h3>
              <div className='flex w-[24px] justify-center rounded-full bg-crimson8'>
                <p className='text-base text-slate-50'>{user._count.posts}</p>

              </div>
            </li>
            <li className='flex flex-col items-center gap-3'>
              <h3 className='text-base text-black dark:text-slate-50'>
                # of drafts
              </h3>
              <div className='flex w-[24px] justify-center rounded-full bg-crimson8'>

                { draftsFetcher.data && (
                  <p
                    className='text-base text-slate-50'
                  >
                    { draftsFetcher.data.drafts.length }
                  </p>
                ) }
              </div>
            </li>
          </ul>
        </>
      )}
    </>
  )
}
