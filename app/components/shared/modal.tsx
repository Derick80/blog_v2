// app/components/modal.tsx
import { Portal } from './portal'
import { useNavigate } from '@remix-run/react'

interface props {
  children: React.ReactNode
  isOpen: boolean
  ariaLabel?: string
  className?: string
}

export const Modal: React.FC<props> = ({
  children,
  isOpen,
  ariaLabel,
  className
}) => {
  const navigate = useNavigate()
  if (!isOpen) return null

  return (
    <Portal wrapperId='modal'>
      <div
        className='bg-gray-600 dark:bg-slate-400 fixed inset-0 overflow-y-auto bg-opacity-80 dark:bg-opacity-80'
        aria-labelledby={ariaLabel ?? 'modal-title'}
        role='dialog'
        aria-modal='true'
        onClick={() => navigate('/')}
      ></div>
      <div className='pointer-events-none fixed inset-0 flex max-h-screen items-center justify-center overflow-scroll'>
        <div
          className={`${className} bg-slate-400 pointer-events-auto max-h-screen p-4 md:rounded-xl`}
        >
          {/* This is where the modal content is rendered  */}
          {children}
        </div>
      </div>
    </Portal>
  )
}
