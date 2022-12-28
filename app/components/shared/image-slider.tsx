import { JapanImages } from '@prisma/client'
import { Link, NavLink } from '@remix-run/react'
import { useState } from 'react'
// https://github.com/zioan/react-slider/blob/master/src/components/Slider2.jsx
export type CarouselProps = {
  images: JapanImages[]
}

export const ImageSlider = ({ images }: CarouselProps) => {
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
    <article className='flex flex-col items-center justify-center'>
      <div className=''>
        {images?.map((item, index) => {
          return (
            <div
              key={index}
              className={
                activeSlide === index
                  ? 'flex items-center justify-center'
                  : 'hidden'
              }
            >
              <div className='flex flex-col items-center justify-center'>
                <button className='' onClick={() => prevSliderHandler(index)}>
                  <span className='material-symbols-outlined -ml-5 h-12 w-20 text-4xl'>
                    arrow_back_ios
                  </span>
                </button>
              </div>
              <div className='h-[400px] w-1/2' key={index}>
                <h1 className='text-center text-2xl'>{item.imgTitle}</h1>

                <div
                  className='relative overflow-hidden rounded-t-lg'
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
                  <div>{item.imgDescription}</div>
                  <Link to={`/travel/${index}/edit`}>Edit</Link>
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
    </article>
  )
}
