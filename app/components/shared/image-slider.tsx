import { JapanImages, TravelLog } from '@prisma/client'
import { Link, NavLink } from '@remix-run/react'
import { useState } from 'react'
import { useOptionalUser } from '~/utils/utils'
// https://github.com/zioan/react-slider/blob/master/src/components/Slider2.jsx
export type CarouselProps = {
  images: TravelLog[]
}

export const ImageSlider = ({ images }: CarouselProps) => {
  const user = useOptionalUser()
  const [activeSlide, setActiveSlide] = useState(1)

  const prevSliderHandler = (index: number) => {
    if (index === 0) {
      setActiveSlide(images.length - 1)
    } else if (index > 1) {
      setActiveSlide(activeSlide - 1)
    } else {
      setActiveSlide(images.length - 1)
    }
  }

  const nextSliderHandler = (index: number) => {
    if (index === images.length - 1) {
      setActiveSlide(1)
    } else if (index < images.length - 1) {
      setActiveSlide(activeSlide + 1)
    } else {
      setActiveSlide(images.length - 1)
    }
  }

  return (
    <>
      {' '}
      {images?.map((item, index) => {
        return (
          <div
            key={index}
            className={
              activeSlide === index
                ? 'flex w-full items-center justify-center'
                : 'hidden'
            }
          >
            <div className='flex'>
              <button className='' onClick={() => prevSliderHandler(index)}>
                <span className='material-symbols-outlined -ml-5 h-12 w-20 text-4xl'>
                  arrow_back_ios
                </span>
              </button>
            </div>
            <div className='h-[400px] w-full' key={index}>
              <h1 className='text-center text-2xl'>{item.imageTitle}</h1>

              <div
                className='rounded-t-lg'
                style={{
                  backgroundImage: `url(${item.imageUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  height: '400px',
                  width: '100%'
                }}
              ></div>
              <div className='flex w-full justify-between rounded-b-lg bg-slate-200 p-2 text-center text-2xl text-zinc-900 dark:bg-slate-500 dark:text-slate-100'>
                <div> </div>
                <div>{item.imageDescription}</div>
                {user?.role === 'ADMIN' ? (
                  <Link to={`/travel/${item.id}/edit`}>Edit</Link>
                ) : (
                  <div></div>
                )}
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
    </>
  )
}
