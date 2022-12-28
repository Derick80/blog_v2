import { Link, NavLink } from '@remix-run/react'
import { useState } from 'react'
// https://github.com/zioan/react-slider/blob/master/src/components/Slider2.jsx
export type CarouselProps = {
  images: Array<{
    id: number
    imageUrl: string
    userId: string
    imgTitle: string | ''
    imgDescription: string | ''
  }>
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
    <div className='m-6'>
      {images?.map((item, index) => {
        return (
          <div
            key={index}
            className={
              activeSlide === index
                ? 'flex items-center justify-between'
                : 'hidden'
            }
          >
            <button
              className='border-2 border-black text-6xl'
              onClick={() => prevSliderHandler(index)}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='-ml-5 h-12 w-20'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={2}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M15 19l-7-7 7-7'
                />
              </svg>
            </button>
            <Link to={`/travel/${index}/edit`}>Edit</Link>

            <div className='h-[400px] w-full' key={index}>
              <NavLink
                //   this will link to the full image page but will probably refactor such that image may be seen and edited in a modal.
                to={`/travel/${item.id}`}
                className='bg-black text-center text-2xl text-white'
              >
                <img
                  src={item.imageUrl}
                  alt='landscape'
                  className='h-[400px] w-full object-cover px-6'
                />
              </NavLink>
            </div>
            <button
              className='border-2 border-black text-6xl'
              onClick={() => nextSliderHandler(index)}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='-ml-5 h-12 w-20'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={2}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M9 5l7 7-7 7'
                />
              </svg>
            </button>
          </div>
        )
      })}
    </div>
  )
}
