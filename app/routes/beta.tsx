import type { ActionArgs, LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Form, useCatch } from '@remix-run/react'
import React from 'react'
import invariant from 'tiny-invariant'
import Uploader from '~/components/shared/s3-uploader'
import { isAuthenticated } from '~/models/auth/auth.server'
import { getPosts } from '~/models/post.server'
import { prisma } from '~/models/prisma.server'

export async function loader({ request }: LoaderArgs) {
  const results = await getPosts()



  return json({  results })
}


export async  function action({ request }: ActionArgs) {
  const user = await isAuthenticated(request)
  invariant(user, 'You must be logged in to do that')

  const formData = await request.formData()
  const title = await formData.get('title')
  const imageUrl = await formData.get('imageUrl')
  if(!title || !imageUrl) {
    return json({errorMsg: 'Something went wrong while uploading'})
  }

  if(typeof title !== 'string' || typeof imageUrl !== 'string') {
    return json({errorMsg: 'Something went wrong while uploading'})
  }

  await prisma.imageTest.create({
    data: {
      title,
      imageUrl,
      userId: user.id
    }
  })


  return json({title, imageUrl})
}



export default function Index() {
  const [formData, setFormData] = React.useState({
    title: '',
    imageUrl: '',

  })


  return (<>

  <div>
    <Uploader />

  </div>

  <Form method="post" >
  <input type="text" name="title"  value={formData.title} required
  onChange={(e) => setFormData({...formData, title: e.target.value})}
  />

  </Form>




  </>)
}

export function CatchBoundary() {
  const caught = useCatch();

  return (
    <div>
      <h1>Caught</h1>
      <p>Status: {caught.status}</p>
      <pre>
        <code>{JSON.stringify(caught.data, null, 2)}</code>
      </pre>
    </div>
  );
}