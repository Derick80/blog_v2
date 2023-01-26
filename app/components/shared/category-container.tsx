import { Badge } from '@mantine/core'
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
      <Badge key={index}>
        <Link
          prefetch='intent'
          to={`/blog/categories/${value}`}
          style={{ textDecoration: 'none', color: 'currentcolor' }}
        >
          {value}
        </Link>
      </Badge>
    </>
  )
}
