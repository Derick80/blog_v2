import {
  useMatches,
  useParams} from '@remix-run/react'

export default function EditProfile() {
  const params = useParams()
  const userId = params.userId
  console.log(userId, 'userId')

  const data = useMatches()
  console.log(data, 'data')

  return <></>
}
