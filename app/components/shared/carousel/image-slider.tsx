import { Button, Flex, Text, Title } from '@mantine/core'
import type { TravelLog } from '@prisma/client'
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'
import { Link } from '@remix-run/react'
import { useState } from 'react'
import type { UserType } from '~/utils/schemas/user-schema'
import { useOptionalUser } from '~/utils/utilities'
// https://github.com/zioan/react-slider/blob/master/src/components/Slider2.jsx
export type CarouselProps = {
  data: TravelLog[]
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
            <Flex
              justify='center'
              align='center'
              key={index}
              className={
                activeSlide === index ? 'mx-auto flex w-fit p-6' : 'hidden'
              }
            >
              <Button className='p-2 ' onClick={() => prevSliderHandler(index)}>
                <ChevronLeftIcon />
              </Button>

              <div
                className='mb-5 h-[250px] w-[250px]'
                key={index}
                id={item.album}
              >
                <div
                  className='relative rounded-lg'
                  style={{
                    backgroundImage: `url(${item.imageUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '200px',
                    width: '100%'
                  }}
                ></div>
                <SliderFooter item={item} user={user} />
              </div>
              <Button className='p-2' onClick={() => nextSliderHandler(index)}>
                <ChevronRightIcon />
              </Button>
            </Flex>
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
    <Flex direction={'column'} align='center' className='w-full'>
      <Title order={3}>{item.imageTitle}</Title>
      <Text>{item.imageDescription}</Text>
      {user?.role === 'ADMIN' ? (
        <Link
          className=' rounded-lg bg-gray-200 p-2'
          to={`/travel/${item.id}/edit`}
        >
          <Button size='sm' variant='filled' color='blue'>
            Edit
          </Button>
        </Link>
      ) : null}
    </Flex>
  )
}
