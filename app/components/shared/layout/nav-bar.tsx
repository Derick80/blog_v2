export default function NavBar({ children }: { children?: React.ReactNode }) {
  return (
    <header className='flex flex-col justify-around p-2 md:flex-row'>
      {children}
    </header>
  )
}
