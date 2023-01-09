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

      <div className='flex flex-col border-2 h-10'>
        <div className='flex flex-row justify-between'>
          <div
          className='flex flex-row justify-between flex-wrap'
          >
           {formData.categories.map((item, index) => (
              <CategoryContainer value={item} index={index} key={index}/>
            ))
            }
          </div>
          <span onClick={() => setIsOpen(!isOpen)} className='flex flex-row'>

{isOpen ?
            <ChevronDownIcon
              /> : <ChevronDownIcon className='transform rotate-90'/>}
            </span>

          </div>
        </div>
      <select
        multiple={multiple}
        value={value}
            onChange={handleSelects}
        size={options.length}
            className='text-bg-crimson12 flex w-full flex-col-reverse items-center rounded-md bg-crimson3'
      >
        {options.map((option) => (
          <option
                className='text-bg-crimson12 mt-4 flex items-center bg-crimson3 pt-5'
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
