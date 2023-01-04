import type { UserProps } from '~/models/user.server'
import { useOptionalUser } from '~/utils/utils'
import UserCard from '../user-ui/user-card'

export type SideBarProps = {
  children: React.ReactNode
}
export default function Sidebar({ children }: SideBarProps) {
  const user= useOptionalUser()
  return (
    <aside className="fixed border-2 border-red-500 left-0 z-10 hidden h-full px-12 lg:block">
      {children}
      <UserCard user={user} />
    </aside>
  )
}
