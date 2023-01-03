import type { UserProps } from '~/models/user.server'
import UserCard from '../user-ui/user-card'

export type SideBarProps = {
  children: React.ReactNode
  user: UserProps
}
export default function Sidebar({ children, user }: SideBarProps) {
  return (
    <div className='flex basis-1/6 flex-col justify-around'>
      {children}
      <UserCard user={user} />
    </div>
  )
}
