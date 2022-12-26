import { useOptionalUser } from '~/utils/utils'

export default function BlogIndex() {
  const user = useOptionalUser()

  return (
    <div>
      <h1>Blog Index</h1>
      {user ? (
        <>
          <p>Welcome {user.userName}</p>
        </>
      ) : null}
    </div>
  )
}
