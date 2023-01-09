import { Link, NavLink } from '@remix-run/react'
import type { ProjectCategories } from '~/models/project.server'

export interface CategoryContainerProps {
  value: string[]
  index: number
}

export default function CategoryContainer({
  value,
  index
}: CategoryContainerProps) {
  return (
    <>
      <div key={index} className='mx-1 mt-2  space-x-2 flex md:mt-4'>
        <label
          className='border-black dark:border-white h-fit max-w-full border-2 p-1 text-center text-xs hover:cursor-pointer md:text-sm md:tracking-wide'
          key={index}
        >
          <Link prefetch='intent' to={`/blog/categories/${value}`}>
            {value}
          </Link>
        </label>
      </div>
    </>
  )
}
