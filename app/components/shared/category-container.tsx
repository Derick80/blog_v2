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
      <div key={index} className='flex space-x-4 rounded-md'>
        <label
          className='border-black dark:border-white border-1 h-fit max-w-full space-x-2 rounded p-1 text-center text-xs hover:cursor-pointer md:text-sm md:tracking-wide'
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
