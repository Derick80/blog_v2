import { useOptionalUser } from '~/utils/utils'
import UserCard from '../user-ui/user-card'

export type SideBarProps = {
  children: React.ReactNode
}
export default function Sidebar({ children }: SideBarProps) {
  const user = useOptionalUser()
  return (
    <aside className='left-0 z-10 hidden h-full border-2 border-red-500 px-12 md:flex lg:block'>
      {children}
      <UserCard user={user} />
    </aside>
  )
}
