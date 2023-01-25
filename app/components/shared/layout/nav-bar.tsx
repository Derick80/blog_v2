export default function NavBar({ children }: { children?: React.ReactNode }) {
  return (
    <header className='flex flex-col p-4 md:p-2 md:flex-row'>
      {children}
    </header>
  )
}
