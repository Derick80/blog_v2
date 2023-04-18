import { NavLink } from '@remix-run/react'
import { Post, PostWithChildren } from '~/utils/schemas/post-schema'

export default function Tags({
  categories
}: {
  categories: PostWithChildren['categories']
}) {
  console.log(categories, 'categories')

  return (
    <div className='flex flex-row gap-2'>
      <div className='flex flex-row flex-wrap gap-2'>
        {categories.map((category) => (
          <NavLink
            to={`/blog/${category.value}`}
            className='rounded-md border-2 p-1 text-xs font-semibold'
            key={category.id}
          >
            {category.value}
          </NavLink>
        ))}
      </div>
    </div>
  )
}
