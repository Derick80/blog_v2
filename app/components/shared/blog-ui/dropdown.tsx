import { NavLink } from '@remix-run/react'
import { IconChevronDown, IconEdit, IconNewSection, IconSun } from '@tabler/icons'
import { useState } from 'react'


export default function Dropdown(){
    const [open, setOpen] = useState(false)

    return (
        <div className="flex w-56 text-right items-center">
            <div className="relative inline-block text-left">
                <div>
                    <button type="button" className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-md  hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" id="options-menu" aria-expanded="true" aria-haspopup="true"
                    onClick={() => setOpen(!open)}
                    >
                        Options
                        <IconChevronDown
                            className="w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100"
                            aria-hidden="true"
                        />
                    </button>
                </div>
              {
                open &&   <div className="absolute md:right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-slate8 shadow-lg z-20 ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1 ">
                    <NavLink
                        className={({ isActive }) =>
                        ` ${
                          isActive
                            ? 'border-black flex border-b-2 space-x-2'
                            : 'flex flex-row items-center space-x-2'
                        }`
                      }
                        to="/blog/new"
                        onClick={() => setOpen(!open)}
                    >

                        <IconNewSection />
                        <p>New Post</p>
                    </NavLink>
                    <NavLink
                         className={({ isActive }) =>
                         ` ${
                           isActive
                             ? 'border-black flex border-b-2 space-x-2'
                             : 'flex flex-row items-center space-x-2'
                         }`
                       }
                        to="/drafts"
                        onClick={() => setOpen(!open)}

                    > <IconNewSection />
                        <p>Drafts</p>

                    </NavLink>
                    <NavLink
                       className={({ isActive }) =>
                       ` ${
                         isActive
                           ? 'border-black flex border-b-2 space-x-2'
                           : 'flex flex-row items-center space-x-2'
                       }`
                        }
                        to="/blog/edit"
                        onClick={() => setOpen(!open)}

                    >
                    <IconSun />
                    </NavLink>

                    </div>
                    </div>
              }

            </div>
        </div>
    )
}