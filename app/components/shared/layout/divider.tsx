type Props = {
  bgColor?: string
  children?: React.ReactNode
}

export const Divider = ({ bgColor, children }: Props) => (
  <div className='relative my-5'>
    <div className='absolute inset-0 flex items-center'>
      <div className='border-slate-300 dark:border-slate-600 w-full border-t' />
    </div>
    <div className='relative flex justify-center text-sm'>
      <span
        className={`text-slate-500 px-2 ${
          bgColor || 'bg-slate-50 dark:bg-slate-800'
        }`}
      >
        {children}
      </span>
    </div>
  </div>
)
