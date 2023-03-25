export default function Divider({ my }: { my?: string }) {
  return (
    <div className='flex flex-col items-center'>
      <hr
        className={`h-px my-${my} w-48 border-0 bg-slate12 dark:bg-slate-50`}
      />
    </div>
  )
}
