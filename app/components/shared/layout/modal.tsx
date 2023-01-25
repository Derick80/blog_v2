// app/components/modal.tsx
import { Portal } from './portal'
import { useNavigate } from '@remix-run/react'

interface props {
  children: React.ReactNode
  isOpen: boolean
  ariaLabel?: string
  className?: string
  onClick?: () => void
}

export const Modal: React.FC<props> = ({
  children,
  isOpen,
  ariaLabel,
  className,
  onClick
}) => {
  const navigate = useNavigate()
  if (!isOpen) return null

  return (
    <Portal wrapperId='modal'>
      <div
        className='inset-0 overflow-y-auto dark:fixed '
        aria-labelledby={ariaLabel ?? 'modal-title'}
        role='dialog'
        aria-modal='true'
        onClick={onClick}
      ></div>
      <div className='pointer-events-none fixed inset-0 flex max-h-screen items-center justify-center overflow-scroll'>
        <div
          className={`${className}pointer-events-auto relative inline-block h-full max-h-screen w-full max-w-2xl transform overflow-y-auto border-2 p-4 align-middle shadow-xl transition-all md:h-auto md:rounded-xl`}
        >
          {/* This is where the modal content is rendered  */}
          {children}
        </div>
      </div>
    </Portal>
  )
}
