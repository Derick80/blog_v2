import { Link, NavLink } from '@remix-run/react'
import type { ProjectCategories } from '~/utils/server/project.server'

export interface CategoryContainerProps {
  value: string[]
  index: number
}

export interface CategoryContainerPropsOne {
  value: ProjectCategories
  index: number
}
export default function CategoryContainer({
  value,
  index
}: CategoryContainerProps | CategoryContainerPropsOne) {
  return (
    <>
      <div key={index} className='flex space-x-4 rounded-md'>
        <label
          className='border-black dark:border-white border-1 h-fit max-w-full space-x-2 rounded p-1 text-center text-xs hover:cursor-pointer md:text-sm md:tracking-wide'
          key={index}
          style={{
            border: '1px solid #000',
            height: 'fit-content',
            maxWidth: 'full',
            padding: '0.25rem',
            textAlign: 'center',
            textTransform: 'capitalize',
            width: 'fit-content'
          }}
        >
          <Link prefetch='intent' to={`/blog/categories/${value}`}>
            {value}
          </Link>
        </label>
      </div>
    </>
  )
}
