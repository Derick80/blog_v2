type Props = {
  bgColor?: string
  children?: React.ReactNode
}

export const Divider = ({ bgColor, children }: Props) => (
  <div className='relative my-5'>
    <div className='absolute inset-x-0 -top-0.5 flex items-center'>
      <div className='w-full border-t border-slate3 dark:border-slate6' />
    </div>
    <div className='relative flex justify-center text-sm'>
      <span
        className={`px-2 text-slate3 ${bgColor || 'bg-slate1 dark:bg-slate8'}`}
      >
        {children}
      </span>
    </div>
  </div>
)
