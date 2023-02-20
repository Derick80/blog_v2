import { Accordion, Button } from '@mantine/core'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import React from 'react'



export default function Experience(){
    const [show, setShow] = React.useState(false)
    return (
        <div

        className='flex flex-col w-full'>

    <h2 className='text-2xl font-bold'>Experience</h2>
    <div
    className='flex justify-between items-center w-full'>
    <h3 className='text-xl font-bold'>Company Name</h3>
    <p className='text-xl font-bold'>Date - Current</p>
    </div>
    <p className='text-lg font-bold'>Position</p>
    <p className='text-lg font-bold'>Location</p>
<ul>
    <li>
    point one
    </li>
    <li>
    point two point twopoint two
    </li>
</ul>
    <Button onClick={() => setShow(!show)}>

    <ChevronDownIcon    />
</Button>
      <ul
        className="list-disc list-inside"
        >




{show &&
<li>
    point one
    </li>}

            </ul>
        </div>
    )
}