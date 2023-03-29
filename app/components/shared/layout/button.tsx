import { type ButtonHTMLAttributes, type ReactNode } from 'react'
import clsx from 'clsx'

type buttonVariant = 'regular' | 'outline' | 'unfilled'
type buttonSize = 'regular' | 'large' | 'small'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: buttonSize
  variant?: buttonVariant
  children: ReactNode
}

export default function Button({
  size = 'regular',
  variant = 'regular',
  children,
  className,
  ...props
}: Props) {
  const sizeClasses = {
    regular: 'px-4 py-2',
    large: 'px-6 py-3',
    small: 'px-2 py-1'
  }
  const variantClasses = {
    regular: 'bg-slate-50 text-slate-900',
    outline: 'border border-slate-50 text-slate-50',
    unfilled: 'bg-transparent text-slate-50'
  }
  return (
    <button
      className={clsx(
        'flex h-fit w-fit flex-row  items-center gap-2 rounded-md text-xs font-medium transition-all disabled:cursor-not-allowed disabled:opacity-50 md:flex-col',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
