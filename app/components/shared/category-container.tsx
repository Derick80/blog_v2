import * as react from '@remix-run/react'

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
        className='flex w-fit flex-row items-center gap-2 rounded-md border px-1 py-1'
        key={index}
      >
        {isLink ? (
          <react.NavLink
            prefetch='intent'
            to={`/categories/${value}`}
            className='text-decoration-none text-xs text-slate12 dark:text-slate-50'
          >
            {value}
          </react.NavLink>
        ) : (
          <div className='text-decoration-none text-xs text-slate12'>
            {value}
          </div>
        )}
        {isEditable && (
          <react.Form
            method='delete'
            action={`/blog/categories/${value}/delete`}
          >
            <button className='-danger'>delete</button>
          </react.Form>
        )}
      </div>
    </>
  )
}
