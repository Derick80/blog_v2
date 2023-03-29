import { type ButtonHTMLAttributes, type ReactNode } from 'react'
import clsx from 'clsx'

type buttonVariant = 'filled' | 'outline' | 'unfilled'
type buttonSize = 'base' | 'large' | 'small'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: buttonSize
  variant?: buttonVariant
  children: ReactNode
}

export default function Button({
  size = 'base',
  variant = 'filled',
  children,
  className,
  ...props
}: Props) {
  const sizeClasses = {
    base: 'px-4 py-2',
    large: 'px-6 py-3',
    small: 'px-2 py-1'
  }
  const variantClasses = {
    filled: 'bg-slate-50 text-slate-900',
    outline: 'border border-slate-100 text-slate12',
    unfilled: 'bg-transparent text-slate12'
  }
  return (
    <button
      className={clsx(
        'flex h-fit w-fit flex-row items-center gap-2 rounded-md text-xs font-medium transition-all disabled:cursor-not-allowed disabled:opacity-50 md:flex-col',
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
