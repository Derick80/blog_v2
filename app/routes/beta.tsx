import { Button } from '~/components/shared/button'
import { ImagePlaceHolder } from '~/components/shared/icons'

const button_base =
  'inline-flex items-center border justify-center rounded-xl px-4 py-2 font-medium leading-4 transition duration-300 ease-in-out hover:-translate-y-1 focus:outline-none focus:ring-2 disabled:cursor-not-allowed'

const btn_outline = `bg-slate-100 border shadow-sm text-slate-600 border-slate-200 hover:bg-slate-700
        hover:border-red-300  dark:text-slate-300 dark:bg-slate-800 dark:border-slate-700  dark:hover:border-sky-300`

const btn_solid = `bg-slate-600 border shadow-sm text-slate-300 dark:text-slate-200 dark:border-none border-slate-700 hover:bg-slate-800`
const btn_success = `bg-green-500 shadow-sm text-slate-900 dark:text-slate-100  hover:bg-green-600`
const btn_warn = `bg-yellow-500 border shadow-sm text-slate-900 dark:text-slate-100 border-yellow-500 hover:bg-yellow-600`
const btn_danger = `bg-red-500 shadow-sm text-slate-900 dark:text-slate-100 border-red-500 hover:bg-red-600`

const btn_solid_primary = `bg-green-500 border shadow-sm text-slate-900 dark:text-slate-100 `
export default function Index() {
  return (
    <div className='flex min-h-screen flex-row items-center justify-center py-2'>
      <div className='flex h-full w-full flex-col border-2  '>
        <div className='min-h-screen p-2'>
          dark
          <ul>
            Base
            <li>
              <Button className={`${button_base}`}>base</Button>
            </li>
          </ul>
          <ul>
            Outline
            <li>
              {' '}
              <Button className={`${button_base} ${btn_outline}`}>
                outline
              </Button>
            </li>
            <li>
              <Button
                className={`${button_base} ${btn_outline} ${btn_success}`}
              >
                success
              </Button>
            </li>
          </ul>
          <ul className=''>
            Solid
            <li>
              {' '}
              <Button className={`${button_base} ${btn_solid}`}>solid</Button>
            </li>
            <li>
              {' '}
              <Button className={`${button_base} ${btn_solid_primary}`}>
                success
              </Button>
            </li>
            <li>
              <Button className={`${button_base} ${btn_warn}`}>warn</Button>
            </li>
            <li>
              <Button className={`${button_base} ${btn_danger}`}>error</Button>
            </li>
          </ul>
        </div>
      </div>
      <div className='flex h-full w-full flex-row border-2 '>
        <div className='min-h-screen p-2'>
          Light
          <ul>
            Base
            <li>
              <Button className={`${button_base}`}>base</Button>
            </li>
          </ul>
          <ul>
            Outline
            <li>
              {' '}
              <Button className={`${button_base} ${btn_outline}`}>
                outline
              </Button>
            </li>
            <li>
              <Button
                className={`${button_base} ${btn_outline} ${btn_success}`}
              >
                success
              </Button>
            </li>
          </ul>
          <ul className=''>
            Solid
            <li>
              {' '}
              <Button className={`${button_base} ${btn_solid}`}>solid</Button>
            </li>
            <li>
              {' '}
              <Button className={`${button_base} ${btn_solid_primary}`}>
                success
              </Button>
            </li>
            <li>
              <Button className={`${button_base} ${btn_warn}`}>warn</Button>
            </li>
            <li>
              <Button className={`${button_base} ${btn_danger}`}>error</Button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
