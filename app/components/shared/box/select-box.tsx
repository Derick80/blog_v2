import { ChevronDownIcon } from '@radix-ui/react-icons'
import React from 'react'
import CategoryContainer from '../category-container'

export type Option = { label: string; value: string }

export type Options = Option[]

type SelectProps = {
  label: string
  value: string[]
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
  const [formData, setFormData] = React.useState({
    categories: value as string[]
  })

  const [isOpen, setIsOpen] = React.useState(true)
  function handleSelects(event: React.ChangeEvent<HTMLSelectElement>) {
    const { value } = event.target
    if (formData.categories.includes(value)) {
      setFormData((prev) => ({
        ...prev,
        categories: prev.categories.filter((item) => item !== value)
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        categories: [...prev.categories, value]
      }))
    }
  }

  return (
    <>
      <div className='flex h-10 flex-col gap-5 border-2'>
        <div className='flex flex-row justify-between'>
          <div className='flex flex-row flex-wrap justify-between'>
            {formData.categories.map((item, index) => (
              <CategoryContainer value={item} index={index} key={index} />
            ))}
          </div>
          <span
            onClick={() => setIsOpen(!isOpen)}
            className='mb-3 flex flex-row'
          >
            {isOpen ? (
              <ChevronDownIcon />
            ) : (
              <ChevronDownIcon className='rotate-90 transform' />
            )}
          </span>
        </div>
      </div>
      <select
        multiple={multiple}
        value={value}
        onChange={handleSelects}
        size={options.length}
        className='text-bg-d flex flex-col-reverse rounded-md'
      >
        {options.map((option) => (
          <option
            className='mt-4 scroll-smooth pt-5 text-right text-xs font-semibold'
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
