import React from 'react'

export type Option = { label: string; value: string }

export type Options = Option[]

type SelectProps = {
  label: string
  value: string | string[]
  options: Options
  multiple: boolean
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void
} & React.SelectHTMLAttributes<HTMLSelectElement>

export const Select = ({
  label,
  onChange,
  value,
  options,
  multiple = true
}: SelectProps) => {
  const [selected, setSelected] = React.useState<string[]>([])
  function handleSelected(event: React.ChangeEvent<HTMLSelectElement>) {
    const { value } = event.target
    if (selected.includes(value)) {
      setSelected((prev) => ({
        ...prev.filter((item) => item !== value)
      }))
    } else {
      setSelected((prev) => [...prev, value])
    }
  }
  return (
    <>
      <select
        multiple={multiple}
        value={value}
        onChange={onChange}
        size={options.length}
        className=''
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
