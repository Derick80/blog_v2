import { motion } from 'framer-motion'

// use this to change icons in other places
export const iconAttrs = {
  xmlns: 'http://www.w3.org/2000/svg',
  width: '16',
  height: '16',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: '2',
  strokeLinecap: 'round' as 'round',
  strokeLinejoin: 'round' as 'round'
}
export function MoonIcon() {
  return (
    <svg
      className='w-full'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='sky-blue-400'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M12,3c-4.97,0-9,4.03-9,9s4.03,9,9,9s9-4.03,9-9c0-0.46-0.04-0.92-0.1-1.36c-0.98,1.37-2.58,2.26-4.4,2.26 c-2.98,0-5.4-2.42-5.4-5.4c0-1.81,0.89-3.42,2.26-4.4C12.92,3.04,12.46,3,12,3L12,3z'
        fill='currentColor'
      />
    </svg>
  )
}

export function SunIcon() {
  return (
    <svg
      className='w-full'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        fill='currentColor'
        d='M12 15q1.25 0 2.125-.875T15 12q0-1.25-.875-2.125T12 9q-1.25 0-2.125.875T9 12q0 1.25.875 2.125T12 15Zm0 2q-2.075 0-3.537-1.463Q7 14.075 7 12t1.463-3.538Q9.925 7 12 7t3.538 1.462Q17 9.925 17 12q0 2.075-1.462 3.537Q14.075 17 12 17ZM2 13q-.425 0-.712-.288Q1 12.425 1 12t.288-.713Q1.575 11 2 11h2q.425 0 .713.287Q5 11.575 5 12t-.287.712Q4.425 13 4 13Zm18 0q-.425 0-.712-.288Q19 12.425 19 12t.288-.713Q19.575 11 20 11h2q.425 0 .712.287.288.288.288.713t-.288.712Q22.425 13 22 13Zm-8-8q-.425 0-.712-.288Q11 4.425 11 4V2q0-.425.288-.713Q11.575 1 12 1t.713.287Q13 1.575 13 2v2q0 .425-.287.712Q12.425 5 12 5Zm0 18q-.425 0-.712-.288Q11 22.425 11 22v-2q0-.425.288-.712Q11.575 19 12 19t.713.288Q13 19.575 13 20v2q0 .425-.287.712Q12.425 23 12 23ZM5.65 7.05 4.575 6q-.3-.275-.288-.7.013-.425.288-.725.3-.3.725-.3t.7.3L7.05 5.65q.275.3.275.7 0 .4-.275.7-.275.3-.687.287-.413-.012-.713-.287ZM18 19.425l-1.05-1.075q-.275-.3-.275-.712 0-.413.275-.688.275-.3.688-.287.412.012.712.287L19.425 18q.3.275.288.7-.013.425-.288.725-.3.3-.725.3t-.7-.3ZM16.95 7.05q-.3-.275-.287-.688.012-.412.287-.712L18 4.575q.275-.3.7-.288.425.013.725.288.3.3.3.725t-.3.7L18.35 7.05q-.3.275-.7.275-.4 0-.7-.275ZM4.575 19.425q-.3-.3-.3-.725t.3-.7l1.075-1.05q.3-.275.713-.275.412 0 .687.275.3.275.288.688-.013.412-.288.712L6 19.425q-.275.3-.7.287-.425-.012-.725-.287ZM12 12Z'
      />
    </svg>
  )
}

export function moreMenu() {
  ;<svg xmlns='http://www.w3.org/2000/svg' height='48' width='48'>
    <path d='M24 40q-1 0-1.7-.7t-.7-1.7q0-1 .7-1.7t1.7-.7q1 0 1.7.7t.7 1.7q0 1-.7 1.7T24 40Zm0-13.6q-1 0-1.7-.7t-.7-1.7q0-1 .7-1.7t1.7-.7q1 0 1.7.7t.7 1.7q0 1-.7 1.7t-1.7.7Zm0-13.6q-1 0-1.7-.7t-.7-1.7q0-1 .7-1.7T24 8q1 0 1.7.7t.7 1.7q0 1-.7 1.7t-1.7.7Z' />
  </svg>
}

export function Twitter() {
  return (
    <>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='fill-black text-base dark:fill-white'
        viewBox='0 0 248 204'
      >
        <g id='Logo_1_'>
          <path
            id='white_background'
            d='M221.95,51.29c0.15,2.17,0.15,4.34,0.15,6.53c0,66.73-50.8,143.69-143.69,143.69v-0.04
		C50.97,201.51,24.1,193.65,1,178.83c3.99,0.48,8,0.72,12.02,0.73c22.74,0.02,44.83-7.61,62.72-21.66
		c-21.61-0.41-40.56-14.5-47.18-35.07c7.57,1.46,15.37,1.16,22.8-0.87C27.8,117.2,10.85,96.5,10.85,72.46c0-0.22,0-0.43,0-0.64
		c7.02,3.91,14.88,6.08,22.92,6.32C11.58,63.31,4.74,33.79,18.14,10.71c25.64,31.55,63.47,50.73,104.08,52.76
		c-4.07-17.54,1.49-35.92,14.61-48.25c20.34-19.12,52.33-18.14,71.45,2.19c11.31-2.23,22.15-6.38,32.07-12.26
		c-3.77,11.69-11.66,21.62-22.2,27.93c10.01-1.18,19.79-3.86,29-7.95C240.37,35.29,231.83,44.14,221.95,51.29z'
          />
        </g>
      </svg>
    </>
  )
}
export function BrandIcon() {
  return (
    <motion.div
      style={{ width: '100%', height: '100%' }}
      animate={{ rotate: 360 }}
      transition={{ ease: 'linear', delay: 1, duration: 5, repeat: Infinity }}
    >
      <motion.svg
        version='1.1'
        id='Layer_1'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 5000 4034.8'
      >
        <g transform='rotate(0 1018.5 493.6827)'>
          <g transform='matrix(1 0 0 -1 0 64)'>
            <g>
              <g>
                <path
                  transform-origin='50 50'
                  transform-box='fillBox'
                  animation-dur={3}
                  animation-name='rotate'
                  animation-iteration-count='infinite'
                  d='M3408.1-3192.7c-21.4-15.7-51.4-11.1-67.1,10.3c-15.7,21.4-11.1,51.4,10.3,67.1l0,0
					c638.7,469.3,776,1367.4,306.7,2006.1s-1367.4,776-2006,306.7s-776-1367.4-306.7-2006.1c430.2-585.5,1230.1-757.1,1862.5-399.6
					c23.1,13,52.4,4.9,65.4-18.2c13-23.1,4.9-52.4-18.2-65.4c-739.1-418.2-1677.3-158-2095.5,581.2s-158,1677.3,581.2,2095.5
					s1677.3,158,2095.5-581.2C4219.6-1874.1,4035.8-2731.6,3408.1-3192.7L3408.1-3192.7z'
                />
                <path
                  d='M2500-706.8c689.8,0.7,1249.5-557.8,1250.3-1247.6s-557.8-1249.5-1247.6-1250.3s-1249.5,557.8-1250.3,1247.6
					c-0.3,315.7,118.9,619.7,333.6,851.1c18,19.4,48.4,20.5,67.8,2.5s20.5-48.4,2.5-67.8l0,0c-432.5-466.3-405.1-1195,61.2-1627.5
					s1195-405.1,1627.5,61.2s405.1,1195-61.2,1627.5c-408.1,378.5-1028.6,411-1473.9,77.1c-21.2-15.9-51.3-11.6-67.2,9.5
					c-15.9,21.2-11.6,51.3,9.5,67.2c0,0,0,0,0.1,0.1C1967.6-793.8,2230.2-706.1,2500-706.8z'
                />
                <path
                  d='M1780.2-2386.3c-26.5,0-48,21.5-48,48s21.5,48,48,48h52.3c7.2,42.7,24,83.3,49.2,118.6l-104.9,104.9
					c-19.1,18.4-19.6,48.8-1.2,67.8c18.4,19.1,48.8,19.6,67.8,1.2c0.4-0.4,0.8-0.8,1.2-1.2l104.9-104.9
					c35.3,25.2,75.8,42,118.6,49.2v52.3c0,26.5,21.5,48,48,48s48-21.5,48-48v-52.3c42.7-7.2,83.3-24,118.6-49.2l104.9,104.9
					c19.1,18.4,49.4,17.9,67.8-1.2c18-18.6,18-48.1,0-66.7l-104.9-104.9c25.2-35.3,42-75.8,49.2-118.6h52.3c26.5,0,48-21.5,48-48
					s-21.5-48-48-48h-52.3c-7.2-42.7-24-83.3-49.2-118.6l104.9-104.9c18.4-19.1,17.9-49.4-1.2-67.8c-18.6-18-48.1-18-66.7,0
					l-104.9,104.9c-35.3-25.2-75.8-42-118.6-49.2v-52.3c0-26.5-21.5-48-48-48s-48,21.5-48,48v52.3c-42.7,7.2-83.3,24-118.6,49.2
					l-104.9-104.9c-19.1-18.4-49.4-17.9-67.8,1.2c-18,18.6-18,48.1,0,66.7l104.9,104.9c-25.2,35.3-42,75.8-49.2,118.6H1780.2z
					 M2116.1-2530.2c106,0,191.9,85.9,191.9,191.9s-85.9,191.9-191.9,191.9s-191.9-85.9-191.9-191.9S2010.1-2530.2,2116.1-2530.2z'
                />
                <path
                  d='M2548-1618.5c-26.5,0-48,21.5-48,48s21.5,48,48,48h52.3c7.2,42.7,24,83.3,49.2,118.6L2544.6-1299
					c-19.1,18.4-19.6,48.8-1.2,67.8c18.4,19.1,48.8,19.6,67.8,1.2c0.4-0.4,0.8-0.8,1.2-1.2l104.9-104.9
					c35.3,25.2,75.8,42,118.6,49.2v52.3c0,26.5,21.5,48,48,48s48-21.5,48-48v-52.3c42.7-7.2,83.3-24,118.6-49.2l104.9,104.9
					c19.1,18.4,49.4,17.9,67.8-1.2c18-18.6,18-48.1,0-66.7L3118.3-1404c25.2-35.3,42-75.8,49.2-118.6h52.3c26.5,0,48-21.5,48-48
					s-21.5-48-48-48h-52.3c-7.2-42.7-24-83.3-49.2-118.6l104.9-104.9c18.4-19.1,17.9-49.4-1.2-67.8c-18.6-18-48.1-18-66.7,0
					L3050.4-1805c-35.3-25.2-75.8-42-118.6-49.2v-52.3c0-26.5-21.5-48-48-48s-48,21.5-48,48v52.3c-42.7,7.2-83.3,24-118.6,49.2
					l-104.9-104.9c-19.1-18.4-49.4-17.9-67.8,1.2c-18,18.6-18,48.1,0,66.7l104.9,104.9c-25.2,35.3-42,75.8-49.2,118.6L2548-1618.5
					L2548-1618.5z M2883.9-1762.5c106,0,191.9,85.9,191.9,191.9s-85.9,191.9-191.9,191.9s-191.9-85.9-191.9-191.9
					C2691.9-1676.5,2777.9-1762.5,2883.9-1762.5z'
                />
                <path
                  d='M1924.2-1666.5c26.5,0,48,21.5,48,48c0,106,85.9,191.9,191.9,191.9c26.5,0,48-21.5,48-48s-21.5-48-48-48
					c-53,0-96-43-96-96c0-79.5-64.4-144-144-144c-79.5,0-144,64.4-144,144c0.2,211.9,172,383.6,383.9,383.9c79.5,0,144-64.4,144-144
					c0-26.5-21.5-48-48-48s-48,21.5-48,48s-21.5,48-48,48c-158.9-0.2-287.7-129-287.9-287.9
					C1876.2-1645,1897.7-1666.5,1924.2-1666.5z'
                />
                <path
                  d='M2787.9-2770.1c-79.5,0-144,64.4-144,144c0,79.5,64.4,144,144,144c79.5,0,144-64.4,144-144
					C2931.9-2705.7,2867.4-2770.1,2787.9-2770.1z M2787.9-2578.2c-26.5,0-48-21.5-48-48s21.5-48,48-48s48,21.5,48,48
					S2814.4-2578.2,2787.9-2578.2z'
                />
                <path
                  d='M2835.9-2242.3c0,79.5,64.4,144,144,144c211.9-0.2,383.6-172,383.9-383.9c0-79.5-64.4-144-144-144
					c-79.5,0-144,64.4-144,144c0,53-43,96-96,96C2900.3-2386.3,2835.9-2321.8,2835.9-2242.3z M2979.8-2290.3
					c106,0,191.9-85.9,191.9-191.9c0-26.5,21.5-48,48-48s48,21.5,48,48c-0.2,158.9-129,287.7-287.9,287.9c-26.5,0-48-21.5-48-48
					C2931.9-2268.8,2953.3-2290.3,2979.8-2290.3z'
                />
              </g>
            </g>
          </g>
        </g>
      </motion.svg>
    </motion.div>
  )
}

export function ImagePlaceHolder() {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' height='48' width='48'>
      <path d='M9 42q-1.2 0-2.1-.9Q6 40.2 6 39V9q0-1.2.9-2.1Q7.8 6 9 6h30q1.2 0 2.1.9.9.9.9 2.1v30q0 1.2-.9 2.1-.9.9-2.1.9Zm0-3h30V9H9v30Zm2.8-4.85h24.45l-7.35-9.8-6.6 8.55-4.65-6.35ZM9 39V9v30Z' />
    </svg>
  )
}

export function UserPlaceHolder() {
  return (
    <svg
      className='absolute -left-1 h-12 w-12 text-gray-400'
      fill='currentColor'
      viewBox='0 0 20 20'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fill-rule='evenodd'
        d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z'
        clip-rule='evenodd'
      ></path>
    </svg>
  )
}

export function VerticalDots() {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' height='48' width='48'>
      <path d='M24 40q-1 0-1.7-.7t-.7-1.7q0-1 .7-1.7t1.7-.7q1 0 1.7.7t.7 1.7q0 1-.7 1.7T24 40Zm0-13.6q-1 0-1.7-.7t-.7-1.7q0-1 .7-1.7t1.7-.7q1 0 1.7.7t.7 1.7q0 1-.7 1.7t-1.7.7Zm0-13.6q-1 0-1.7-.7t-.7-1.7q0-1 .7-1.7T24 8q1 0 1.7.7t.7 1.7q0 1-.7 1.7t-1.7.7Z' />
    </svg>
  )
}

export function CommentIcon() {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' height='24' width='48'>
      <path d='M12 28h24v-3H12Zm0-6.5h24v-3H12Zm0-6.5h24v-3H12Zm32 29-8-8H7q-1.15 0-2.075-.925Q4 34.15 4 33V7q0-1.15.925-2.075Q5.85 4 7 4h34q1.2 0 2.1.925Q44 5.85 44 7ZM7 7v26h30.25L41 36.75V7H7Zm0 0v29.75V7Z' />
    </svg>
  )
}
