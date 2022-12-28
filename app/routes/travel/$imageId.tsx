import { LoaderArgs, json } from '@remix-run/node'
import { useLoaderData, Link, Outlet } from '@remix-run/react'
import invariant from 'tiny-invariant'
import { isAuthenticated } from '~/models/auth/auth.server'
import { getJImageById } from '~/models/j-images.server'

export async function loader({ request, params }: LoaderArgs) {
  const user = await isAuthenticated(request)
  invariant(user, 'user is required')
  const currentUser = user.id
  const imageId = Number(params.imageId)
  const image = await getJImageById(imageId)
  console.log('imageId', imageId)

  // if(!photo) return redirect('/travel'    )
  return json({ image, currentUser })
}

export default function Page() {
  const data = useLoaderData<typeof loader>()
  return (
    <>
      One Image
      <div key={data.image.id}>
        <img src={data.image.imageUrl} alt={data.image.imgTitle} />
        <h2>{data.image.imgTitle}</h2>
        <p>{data.image.imgDescription}</p>
        {data.currentUser === data.image.userId && (
          <>
            <Link to={`/travel/${data.image.id}/edit`}>Edit</Link>
          </>
        )}
      </div>
      <Outlet />
    </>
  )
}
