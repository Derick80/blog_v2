import { Outlet } from '@remix-run/react'

export default function TravelRoute() {
  return (
    <>
      <div className='flex flex-col md:flex-row mt-10'>
      <div className=' items-center p-2 flex flex-row md:flex-col flex-wrap space-x-6 justify-start'>
        <h1 className='mh1 underline capitalize'>Travel Photos</h1>

<div
className='pt-4 flex flex-col justify-start items-start space-y-2'
>
<h1 className='mh1 -indent-3.5'>Japan</h1>

<ul>
  <li
  className='text-base font-semibold indent-2 italic  '
  ><a href='#kyoto'>Kyoto</a></li>
  <li
    className='text-base font-semibold indent-2 italic '

  ><a href='#shinjuku'>Shinjuku</a></li>

</ul>
<h1 className='mh1 -indent-3.5'>New York City</h1>
<ul>
  <li
    className='text-base font-semibold indent-2 italic'

  ><a href='#nyc'>NYC</a></li>
</ul>
</div>
      </div>


      <div className='grow'>
    <div className='flex justify-center'>  <h1 className='mh1 uppercase'>Gallery</h1></div>


     <Outlet />



      </div>

    </div>
    </>
  )
}
