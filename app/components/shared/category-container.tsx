import { Link, NavLink } from '@remix-run/react'
import type { ProjectCategories } from '~/models/project.server'

export interface CategoryContainerProps {
  category: ProjectCategories[]
}

export default function CategoryContainer({
  category
}: CategoryContainerProps) {
  return (
    <div className='flex'>
      {category
        ? category.map((cat) => (
            <div key={cat.id} className='mx-1 mt-2 flex md:mt-4'>
              <label
                className='border-black dark:border-white h-fit max-w-full border-2 p-1 text-center text-xs hover:cursor-pointer md:text-sm md:tracking-wide'
                key={cat.id}
              >
                <Link prefetch='intent' to={`/blog/categories/${cat.value}`}>
                  {cat.value}
                </Link>
              </label>
            </div>
          ))
        : null}
    </div>
  )
}
