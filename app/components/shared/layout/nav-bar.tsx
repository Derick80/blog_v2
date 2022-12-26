export default function NavBar({ children }: { children?: React.ReactNode }) {
  return <header className='flex flex-row items-center p-2'>{children}</header>
}
