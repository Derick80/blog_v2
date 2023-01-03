import { JapanImages, TravelLog } from '@prisma/client'
import { Link, NavLink } from '@remix-run/react'
import { useState } from 'react'
import { CitiesAndAlbums } from '~/models/travel.server'
import { useOptionalUser } from '~/utils/utils'
// https://github.com/zioan/react-slider/blob/master/src/components/Slider2.jsx
export type CarouselProps = {
  data: CitiesAndAlbums
}

export const ImageSlider = ({ data }: CarouselProps) => {
  const user = useOptionalUser()
  const [activeSlide, setActiveSlide] = useState(1)

  const prevSliderHandler = (index: number) => {
    if (index === 0) {
      setActiveSlide(data.length - 1)
    } else if (index > 1) {
      setActiveSlide(activeSlide - 1)
    } else {
      setActiveSlide(data.length - 1)
    }
  }

  const nextSliderHandler = (index: number) => {
    if (index === data.length - 1) {
      setActiveSlide(1)
    } else if (index < data.length - 1) {
      setActiveSlide(activeSlide + 1)
    } else {
      setActiveSlide(data.length - 1)
    }
  }

  return (
    <div className='mb-10'>
      {' '}
      {data?.map((item, index) => {
        return (
          <div
            key={index}
            className={activeSlide === index ? 'h-400 flex p-6' : 'hidden'}
          >
            <div className='flex'>
              <button className='' onClick={() => prevSliderHandler(index)}>
                <span className='material-symbols-outlined -ml-5 h-12 w-20 text-4xl'>
                  arrow_back_ios
                </span>
              </button>
            </div>
            <div className='h-[450px] w-full' key={index} id={item.album}>
              <h2 className='text-center text-xl font-bold'>
                {item.album} - {item.city}
              </h2>
              {item.imageTitle ? (
                <h1 className='text-center text-2xl italic'>
                  {item.imageTitle}
                </h1>
              ) : (
                <div> </div>
              )}

              <div
                className='rounded-t-lg'
                style={{
                  backgroundImage: `url(${item.imageUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  height: '400px',
                  width: '100%'
                }}
              >
                <div className='flex w-full justify-between rounded-b-lg bg-slate-200 p-2 text-center text-2xl text-zinc-900 dark:bg-slate-500/40 dark:text-slate-100'>
                  <div> </div>
                  {item.imageDescription ? (
                    <div className='text-center text-base'>
                      {item.imageDescription}
                    </div>
                  ) : (
                    <div> </div>
                  )}

                  {user?.role === 'ADMIN' ? (
                    <Link
                      className='btn-base btn-solid-warn'
                      to={`/travel/${item.id}/edit`}
                    >
                      Edit
                    </Link>
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
            </div>

            <div className='flex flex-col items-center justify-center'>
              <button onClick={() => nextSliderHandler(index)}>
                <span className='material-symbols-outlined -m4-5 h-12 w-20 text-4xl'>
                  arrow_forward_ios
                </span>
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
