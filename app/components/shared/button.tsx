import { type ButtonHTMLAttributes, type ReactNode } from 'react'
import clsx from 'clsx'

type buttonVariant =
  | 'success'
  | 'warning'
  | 'danger'
  | 'primary'
  | 'success_filled'
  | 'danger_filled'
  | 'primary_filled'
  | 'icon_filled'
  | 'icon_unfilled'
type buttonSize = 'base' | 'large' | 'small' | 'tiny'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: buttonSize
  variant?: buttonVariant
  children: ReactNode
}

export default function Button({
  size = 'base',
  variant = 'primary',
  children,
  className,
  ...props
}: Props) {
  const sizeClasses = {
    base: 'px-4 py-2',
    large: 'px-6 py-3',
    small: 'px-2 py-1',
    tiny: 'px-1 py-1 text-xs'
  }
  const variantClasses = {
    success:
      'rounded border-2 dark:bg-green-500 border-green-500 text-slate-50 hover:bg-green-600 hover:border-green-600',
    warning:
      'rounded border-2 dark:bg-yellow-500 border-yellow-500 text-slate-50 hover:bg-yellow-600 hover:border-yellow-600',
    danger:
      'rounded border-2 dark:bg-red-500 border-red-500 text-slate-50 hover:bg-red-600 hover:border-red-600',
    primary:
      'rounded border-2 dark:bg-blue-500 border-blue-500 text-slate-50 hover:bg-blue-600 hover:border-blue-600',
    success_filled:
      'rounded border-2 bg-green-500 border-green-500 text-slate-50 hover:bg-green-600 hover:border-green-600',
    warning_filled:
      'rounded border-2 bg-yellow-500 border-yellow-500 text-slate-50 hover:bg-yellow-600 hover:border-yellow-600',
    danger_filled:
      'rounded border-2 bg-red-500 border-red-500 text-slate-50 hover:bg-red-600 hover:border-red-600',
    primary_filled:
      'rounded border-2 bg-blue-500 border-blue-500 text-slate-50 hover:bg-blue-600 hover:border-blue-600',
    icon_filled:
      'rounded border-2 bg-slate-500 border-slate-500 text-slate-50 hover:bg-slate-600 hover:border-slate-600',
    icon_unfilled: 'font-semibold text-slate-500 hover:bg-slate-50'
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
