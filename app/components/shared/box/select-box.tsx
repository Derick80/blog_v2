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
        className='w-96 rounded-xl py-2 text-gray-400'
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  )
}
