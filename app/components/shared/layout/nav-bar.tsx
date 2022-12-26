export default function NavBar({ children }: { children?: React.ReactNode }) {
  return (
    <header className='flex flex-row justify-around p-2'>{children}</header>
  )
}
