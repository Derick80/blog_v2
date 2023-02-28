import { Badge, Button } from '@mantine/core'
import { Form, Link, NavLink, useParams } from '@remix-run/react'

export interface CategoryContainerProps {
  value: string[]
  index: number
  isEditable?: boolean
}
export interface CategoryContainerPropsOne {
  value: string
  index: number | string
  isEditable?: boolean
}
export default function CategoryContainer({
  value,
  index,
  isEditable
}: CategoryContainerProps | CategoryContainerPropsOne) {
  return (
    <>
      <div
        className='flex flex-row items-center gap-2 border-2 border-slate-50 rounded-full py-1 w-fit px-1'
      key={index}>
        <NavLink
          prefetch='intent'
          to={`/blog/categories/${value}`}
          style={{ textDecoration: 'none', color: 'currentcolor' }}
        >
          {value}
        </NavLink>
        {isEditable && (
          <Form method='delete' action={`/blog/categories/${value}/delete`}>
            <Button variant='subtle' size='xs'>
              delete
            </Button>
          </Form>
        )}
      </div>
    </>
  )
}
