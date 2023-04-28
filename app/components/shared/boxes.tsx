import clsx from 'clsx'

export function ColBox({
  children,
  className
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={clsx('flex flex-col gap-1 md:gap-2', className)}>
      {children}
    </div>
  )
}

export function RowBox({
  children,
  className
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={clsx('flex flex-row items-center gap-1 md:gap-2', className)}
    >
      {children}
    </div>
  )
}
