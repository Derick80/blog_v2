export default function NavBar({ children }: { children?: React.ReactNode }) {
  return (
    <header className='flex flex-col p-4 md:flex-row md:p-2'>{children}</header>
  )
}
