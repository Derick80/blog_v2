import { Link } from '@remix-run/react'
import type { ProjectCategories } from '~/utils/server/project.server'

export interface CategoryContainerProps {
  value: string[]
  index: number
}
export interface CategoryContainerPropsOne {
  value: ProjectCategories | string
  index: number
}
export default function CategoryContainer({
  value,
  index
}: CategoryContainerProps | CategoryContainerPropsOne) {
  return (
    <>
      <div key={index} className='space-x-4 rounded-md'>
        <label
          className='border-black dark:border-white mb-2 mt-1 flex h-fit w-fit space-x-2 rounded border-2 p-1 text-center text-xs hover:cursor-pointer md:text-sm md:tracking-wide'
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
