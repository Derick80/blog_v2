import { json, LoaderArgs } from '@remix-run/node'

// Ok, this methodworks
export async function loader({ request, params }: LoaderArgs) {
  const userName = params.username

  return json({ params })
}
