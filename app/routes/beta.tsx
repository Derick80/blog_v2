import { Divider } from '@mantine/core'
import type {
  CVExperience,
  Education,
  Publication,
  Skill
} from '@prisma/client'
import {
  CheckCircledIcon,
  StarFilledIcon,
  StarIcon
} from '@radix-ui/react-icons'
import { json } from '@remix-run/node'
import { Form, useLoaderData } from '@remix-run/react'
import { format } from 'date-fns'
import React from 'react'
import type { CV } from '~/utils/schemas/cv-schema'
import { isAuthenticated } from '~/utils/server/auth/auth.server'
import { prisma } from '~/utils/server/prisma.server'

export async function loader({ request }: { request: Request }) {
  const user = await isAuthenticated(request)

  if (!user) {
    return json({ error: 'Not authenticated' }, { status: 401 })
  }

  return json({ user }, { status: 200 })
}

export default function BetaRoute() {
  const data = useLoaderData()
  const [rating, setRating] = React.useState(4)
  return (
    <div className='flex w-[350px] flex-col items-center p-2 md:w-full'>
      <Form className='flex  h-40 w-full items-center justify-center rounded-md bg-gray-100'>
        {[...Array(5)].map((star, index) => {
          const ratingValue = index + 1
          const isRated = ratingValue <= rating

          return (
            <>
              <label key={index} className='flex cursor-pointer items-center'>
                <input
                  type='radio'
                  name='rating'
                  className='hidden'
                  value={ratingValue}
                  onClick={() => setRating(ratingValue)}
                />

                {isRated ? (
                  <StarFilledIcon className='text-yellow-500' />
                ) : (
                  <StarIcon className='text-black' />
                )}
              </label>
            </>
          )
        })}
      </Form>
      <button onClick={() => console.log(rating)}>Submit</button>
    </div>
  )
}
