import { JapanImages, TravelLog } from '@prisma/client'
import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PinLeftIcon
} from '@radix-ui/react-icons'
import { Link, NavLink } from '@remix-run/react'
import { useState } from 'react'
import { CitiesAndAlbums } from '~/models/travel.server'
import { useOptionalUser, UserType } from '~/utils/utils'
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
              activeSlide === index ? 'flex p-6 w-fit mx-auto' : 'hidden'
            }
          >
            <button className='p-2'
             onClick={() => prevSliderHandler(index)}>
              <ChevronLeftIcon />
            </button>

            <div className='h-[450px] w-[450px]' key={index} id={item.album}>
              <div
                className='rounded-lg relative'
                style={{
                  backgroundImage: `url(${item.imageUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  height: '400px',
                  width: '100%'
                }}
              >


              </div>
              <SliderFooter item={item} user={user} />
            </div>

              <button
                className='p-2'
              onClick={() => nextSliderHandler(index)}>
                <ChevronRightIcon />
              </button>

          </div>
          </>

        )
      })}
    </>
  )
}


function SliderFooter({item, user}: {item: TravelLog, user: Partial<UserType> | null | undefined}){

  return(
    <div className="flex justify-center items-center">

        {user?.role === 'ADMIN' ? (
  <Link
    className=' p-2 bg-gray-200 rounded-lg'
    to={`/travel/${item.id}/edit`}
  >
    Edit
  </Link>
) : null}
    </div>
  )
}
