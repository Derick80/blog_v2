import { useState } from 'react'
import { Link } from 'react-router-dom'
import { iconAttrs, VerticalDots } from './icons'
import { Modal } from './layout/modal'

export type OptionProps = {
  children: React.ReactNode
}

export default function PostOptions({ children }: OptionProps) {
  const [expand, setExpand] = useState(false)

  return (
    <div className='flex flex-col items-center justify-center'>
      <button onClick={() => setExpand(!expand)}>
        <span className='material-symbols-outlined'>more_vert</span>
      </button>

      <Modal
        isOpen={expand}
        ariaLabel='Post Options'
        className='flex w-fit flex-col items-center justify-center'
        onClick={() => setExpand(!expand)}
      >
        {children}
      </Modal>
    </div>
  )
}
