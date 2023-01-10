import { Outlet } from '@remix-run/react'
import { useState } from 'react'

const options = [
  {value: '1', label: 'one'},
  {value: '2', label: 'two'},
  {value: '3', label: 'three'},
  {value: '4', label: 'four'},
  {value: '5', label: 'five'},
  {value: '6', label: 'six'},
  {value: '7', label: 'seven'},
  {value: '8', label: 'eight'},
  {value: '9', label: 'nine'},

]
export default function Index() {
  const [open, setOpen] = useState(false)

  return (
    <div
    className='container'
    >

{/* dropdown container */}
<div

>
<div
onClick={()=> setOpen(!open)}
onBlur={()=> setOpen(false)}
tabIndex={0}
>

<div
className='absolute transform translate-y-1 w-full border overflow-auto max-h-36 bg-crimson4'


>


  {options.map((option)=> (
    <div key={option.value}
     className='p-1 cursor-pointer hover:bg-crimson5'
     onClick={()=> console.log(option)}

     >
      {option.label}
      </div>
  ))}

</div>




</div>
</div>
      <Outlet />
    </div>
  )
}
