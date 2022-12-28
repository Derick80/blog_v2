import { LoaderArgs, json, ActionArgs, redirect } from '@remix-run/node'
import { Form, useLoaderData, useNavigate } from '@remix-run/react'
import React, { useTransition } from 'react'
import { badRequest } from 'remix-utils'
import invariant from 'tiny-invariant'
import { Modal } from '~/components/shared/model'
import { isAuthenticated } from '~/models/auth/auth.server'
import { getJImageById, updateJImage } from '~/models/j-images.server'




export async function loader({ request, params }: LoaderArgs) {
    const user = await isAuthenticated(request)
    invariant(user, 'user is required')
    const imageId = Number(params.imageId)
    const image = await getJImageById(imageId)
    console.log('imageId', imageId);

    // if(!photo) return redirect('/travel'    )
    return json({ image,

    })

}

export async function action({request, params}:ActionArgs){

    const formData = await request.formData()
    const id = Number(params.imageId)
    const userId = formData.get('userId')
    const imgTitle = formData.get('imgTitle')
    const imageUrl = formData.get('imageUrl')
    const imgDescription = formData.get('imgDescription')

    if(
        typeof id !== 'number' ||
        typeof userId !== 'string' ||
        typeof imgTitle !== 'string' ||
        typeof imageUrl !== 'string' ||
        typeof imgDescription !== 'string'
    ){
        return badRequest({
            fieldErrors: null,
            fields: null,
            formError: `Please fill out all fields`,

        })

    }

    const fieldErrors = {
        imgTitle: imgTitle.length < 3 ? 'Title must be at least 3 characters' : null,
        imgDescription: imgDescription.length < 3 ? 'Description must be at least 3 characters' : null,
        imageUrl: imageUrl.length < 3 ? 'Image URL must be at least 3 characters' : null,

    }

    const fields = {
        id,
        userId,
        imgTitle,
        imageUrl,
        imgDescription,

    }

    if(Object.values(fieldErrors).some(Boolean)){
        return badRequest({
            fieldErrors,
            fields,
            formError: null

        })

    }

    await updateJImage({...fields})

    return redirect(`/travel`)



}
export default function EditRoute(){
    const navigate = useNavigate()
    const transition = useTransition()
    const data = useLoaderData<typeof loader>()
    const [formData, setFormData] = React.useState({
        imageUrl: data.image.imageUrl,
        imgTitle: data.image.imgTitle || '',
        imgDescription: data.image.imgDescription || '',
        userId: data.image.userId,

    })

    return (
        <Modal
        isOpen={true}
        ariaLabel='Edit Income'
        className='h-3/4 w-full md:w-1/2 lg:w-2/3'
      >        <h1>Edit</h1>
        <Form
        method="post"
        >

<div
className='h-64 w-64'

>
        <img src={formData.imageUrl} alt={formData.imgTitle} />
</div>
        <input
        id="userId"
        name="userId"
        type="hidden"
        value={data.image.userId}
        onChange={(e) => setFormData({...formData, userId: e.target.value})}
        />
        <label htmlFor="imageUrl">Image URL</label>
        <input
        id="imageUrl"
        name="imageUrl"
        type="text"
        value={formData.imageUrl}
        onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
        />

        <label htmlFor="imgTitle">Image Title</label>
        <input
        id="imgTitle"
        name="imgTitle"
        type="text"
        value={formData.imgTitle}

        onChange={(e) => setFormData({...formData, imgTitle: e.target.value})}
        />

        <label htmlFor="imgDescription">Image Description</label>
        <input
        id="imgDescription"
        name="imgDescription"
        type="text"
        value={formData.imgDescription}

        onChange={(e) => setFormData({...formData, imgDescription: e.target.value})}
        />
 <div className='flex flex-row items-center justify-between'>
          <button type='submit' className='btn-base btn-solid space-x-1'>
            <span className='material-symbols-outlined'>save</span>
            <p>{transition.state === 'submitting' ? 'Saving...' : 'Save'}</p>
          </button>
          <button
            type='button'
            className='btn-base btn-outline'
            onClick={() => navigate('/travel')}
          >
            Cancel
          </button>
        </div>

        </Form>
        </Modal>
    )


}