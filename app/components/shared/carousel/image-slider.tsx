import { JapanImages, TravelLog } from '@prisma/client'
import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PinLeftIcon
} from '@radix-ui/react-icons'
import { Link, NavLink } from '@remix-run/react'
import { useState } from 'react'
import { CitiesAndAlbums } from '~/utils/server/travel.server'
import { useOptionalUser, UserType } from '~/utils/utilities'
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
    <>
      {data?.map((item, index) => {
        return (
          <>
            <div
              key={index}
              className={
                activeSlide === index ? 'mx-auto flex w-fit p-6' : 'hidden'
              }
            >
              <button className='p-2' onClick={() => prevSliderHandler(index)}>
                <ChevronLeftIcon />
              </button>

              <div className='h-[450px] w-[450px]' key={index} id={item.album}>
                <div
                  className='relative rounded-lg'
                  style={{
                    backgroundImage: `url(${item.imageUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '400px',
                    width: '100%'
                  }}
                ></div>
                <SliderFooter item={item} user={user} />
              </div>

              <button className='p-2' onClick={() => nextSliderHandler(index)}>
                <ChevronRightIcon />
              </button>
            </div>
          </>
        )
      })}
    </>
  )
}

function SliderFooter({
  item,
  user
}: {
  item: TravelLog
  user: Partial<UserType> | null | undefined
}) {
  return (
    <div className='flex items-center justify-center'>
      <div className='flex flex-col items-center'>
        <h2 className='text-2xl'>{item.imageTitle}</h2>
        <p className='text-lg'>{item.imageDescription}</p>
        {user?.role === 'ADMIN' ? (
          <Link
            className=' bg-gray-200 rounded-lg p-2'
            to={`/travel/${item.id}/edit`}
          >
            Edit
          </Link>
        ) : null}
      </div>
    </div>
  )
}
