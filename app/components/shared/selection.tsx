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



export function Select ({ multiple, value, onChange, options }: MultiSelectProps) {
    const [open, setOpen] = useState(false)

    function selectOption (option: SelectOption) {
        if (value.includes(option)) {
            onChange(value.filter((item) => item !== option))
            console.log('value', value)


        }
        else {
            onChange([...value, option])
            console.log('value',)

        }

    }

    function isOptionSelected (option: SelectOption) {
        return value.includes(option)
    }


    return (
        <div
            className='relative outline-none w-96 min-h-5 border-black border-2 items-center gap-2 shadow-sm p-2 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            onBlur={ () => setOpen(false) }
            onClick={ () => setOpen((prev) => !prev) }
            tabIndex={ 0 }

        >
            <span className='flex-1 flex gap-2 flex-wrap'>
                { value.map((item) => (
                    <button key={ item.id } type='button'
                        className='flex items-center border-2 border-black dark:border-slate-200  rounded text-sm shadow-sm px-1 py-2 gap-2 cursor-pointer bg-none outline-none'
                        onClick={
                            (e) => {
                                e.stopPropagation()
                                selectOption(item)
                            }
                        }

                    >
                        { item.label }
                        <span>&times;</span>
                    </button>
                )) }
            </span>
            <div>

            </div>
            <ul
                className={ `absolute m-0 p-0 list-style-none max-h-15 overflow-y-auto border-2 border-black rounded-lg w-full left-0 bg-white z-index-50 ${open ? 'block' : 'hidden'}` }

            >
                {
                    options.map((option, index) => (
                        <li
                            key={ option.id }
                            onClick={
                                e => {
                                    e.stopPropagation()
                                    selectOption(option)
                                    setOpen(false)
                                } }
                            className={ `p-2 cursor-pointer ${isOptionSelected(option) ? 'bg-gray-200' : ''}` }

                        >
                            { option.label }
                        </li>
                    ))
                }
            </ul>
        </div >



    )
}



