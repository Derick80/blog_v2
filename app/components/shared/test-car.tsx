import { Link, NavLink } from '@remix-run/react'
import { useState } from 'react'
// https://github.com/zioan/react-slider/blob/master/src/components/Slider2.jsx
export type CarouselProps = {
    images: {
      id:  number
      imageUrl: string
      userId: string
    }[]
  }

  export const Carousel2 = ({ images }: CarouselProps) =>{
    const [activeSlide, setActiveSlide] = useState(1)

    const prevSliderHandler = (index: number) => {
        if (index === 0) {
          setActiveSlide(images.length - 1);
        } else if (index > 1) {
          setActiveSlide(activeSlide - 1);
        } else {
          setActiveSlide(images.length - 1);
        }
      };

      const nextSliderHandler = (index: number) => {
        if (index === images.length - 1) {
          setActiveSlide(1);
        } else if (index < images.length - 1) {
          setActiveSlide(activeSlide + 1);
        } else {
          setActiveSlide(images.length - 1);
        }
      };



      return(
<div
    className='m-6'>

        {images.map((item, index)=>{
            return(
                <div
                key={index}
                className={activeSlide === index ? 'flex justify-between items-center' : 'hidden'}
                >
 <button
              className='text-6xl border-2 border-black'
              onClick={() => prevSliderHandler(index)}
            >
             <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-20 -ml-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            </button>
            <div
            className='w-full h-[400px]'>

<Link to={`/travel/${item.id}`}
className='text-2xl text-center text-white bg-black p-2'
><img
src={item.imageUrl}
alt='landscape'
className='object-cover w-full h-[400px] px-6'
/>
</Link>
            </div>
<button
              className='text-6xl border-2 border-black'
              onClick={() => nextSliderHandler(index)}
            >
           <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-20 -ml-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
            </button>

            </div>
            )
        })}

    </div>


      )
  }