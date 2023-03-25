export default function Divider({ my, isSidebar }: { my?: string, isSidebar?: boolean }) {
  const textStyles = isSidebar  ? 'bg-slate-50 bg-slate12 ' : 'bg-slate12 dark:bg-slate-50'
  return (
    <div className='flex flex-col items-center'>
      <hr
        className={`h-px my-${my} w-48 border-0 ${textStyles}`}
      />
    </div>
  )
}
