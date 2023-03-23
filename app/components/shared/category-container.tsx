import { Badge, Button } from '@mantine/core'
import { Form, Link, NavLink, useParams } from '@remix-run/react'

export interface CategoryContainerProps {
  value: string[]
  index: number
  isEditable?: boolean
  isLink?: boolean
}
export interface CategoryContainerPropsOne {
  value: string
  index: number | string
  isEditable?: boolean
  isLink?: boolean
}
export default function CategoryContainer({
  value,
  index,
  isEditable,
  isLink = true
}: CategoryContainerProps | CategoryContainerPropsOne) {
  return (
    <>
      <div
        className='flex w-fit flex-row items-center gap-2 border rounded-md py-1 px-1'
        key={index}
      >
        {isLink ? (
          <NavLink
            prefetch='intent'
            to={`/categories/${value}`}
            className='text-decoration-none text-xs text-black dark:text-slate-50'
          >
            {value}
          </NavLink>
        ) : (
          <div className='text-decoration-none text-xs text-black dark:text-slate-50'>
            {value}
          </div>
        )}
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
