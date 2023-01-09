import React from 'react'

export type Option = { label: string; value: string }

export type Options = Option[]

type SelectProps = {
  label: string
  value: string | string[]
  options: Options
  multiple: boolean
} & React.SelectHTMLAttributes<HTMLSelectElement>

export const Select = ({
  label,
  onChange,
  value,
  options,
  multiple = true
}: SelectProps) => {
  return (
    <>
      <select
        multiple={multiple}
        value={value}
        onChange={onChange}
        size={options.length}
        className='text-bg-crimson12 flex w-full flex-col-reverse rounded-md bg-crimson3'
      >
        {options.map((option) => (
          <option
            className='text-bg-crimson12 mt-4 bg-crimson3 pt-5'
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </>
  )
}
