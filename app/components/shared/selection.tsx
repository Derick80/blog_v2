import { useFetcher } from '@remix-run/react'
import { useEffect, useState } from 'react'

export type SelectOption = {
  id?: string
  label: string
  value: string
}

export type MultiSelectProps = {
  multiple: true
  value: SelectOption[]
  options: SelectOption[]
  id?: SelectOption[]
  onChange: (value: SelectOption[]) => void
}

export function Select({
  multiple,
  value,
  onChange,
  options
}: MultiSelectProps) {
  const [open, setOpen] = useState(false)

  function selectOption(option: SelectOption) {
    if (value.includes(option)) {
      onChange(value.filter((item) => item !== option))
      console.log('value', value)
    } else {
      onChange([...value, option])
      console.log('value')
    }
  }

  function isOptionSelected(option: SelectOption) {
    return value.includes(option)
  }

  return (
    <div
      className='min-h-5 relative w-96 items-center gap-2 border-2 border-black p-2 shadow-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
      onBlur={() => setOpen(false)}
      onClick={() => setOpen((prev) => !prev)}
      tabIndex={0}
    >
      <span className='flex flex-1 flex-wrap gap-2'>
        {value.map((item) => (
          <button
            key={item.id}
            type='button'
            className='flex cursor-pointer items-center gap-2 rounded  border-2 border-black bg-none px-1 py-2 text-sm shadow-sm outline-none dark:border-slate-200'
            onClick={(e) => {
              e.stopPropagation()
              selectOption(item)
            }}
          >
            {item.label}
            <span>&times;</span>
          </button>
        ))}
      </span>
      <div></div>
      <ul
        className={`list-style-none max-h-15 z-index-50 absolute left-0 m-0 w-full overflow-y-auto rounded-lg border-2 border-black bg-white p-0 ${
          open ? 'block' : 'hidden'
        }`}
      >
        {options.map((option, index) => (
          <li
            key={option.id}
            onClick={(e) => {
              e.stopPropagation()
              selectOption(option)
              setOpen(false)
            }}
            className={`cursor-pointer p-2 ${
              isOptionSelected(option) ? 'bg-gray-200' : ''
            }`}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  )
}
