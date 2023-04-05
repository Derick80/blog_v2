import { LoaderArgs, json } from '@remix-run/node'

export async function loader({ request }: LoaderArgs) {
  return json({ message: 'hello world' })
}
export default function ResumeIndex() {
  return <div className='flex flex-col items-center gap-5'></div>
}
