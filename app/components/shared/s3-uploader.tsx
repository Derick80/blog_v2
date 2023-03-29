import type { ActionFunction, UploadHandler } from '@remix-run/node'
import {
  json,
  unstable_composeUploadHandlers as composeUploadHandlers,
  unstable_createMemoryUploadHandler as createMemoryUploadHandler,
  unstable_parseMultipartFormData as parseMultipartFormData
} from '@remix-run/node'
import { useFetcher, useSubmit } from '@remix-run/react'
import { useEffect, useRef, useState } from 'react'
import { s3UploadHandler } from '~/utils/server/s3.server'

type ActionData = {
  errorMsg?: string
  imageUrl?: string
}

export const action: ActionFunction = async ({ request }) => {
  const uploadHandler: UploadHandler = composeUploadHandlers(
    s3UploadHandler,
    createMemoryUploadHandler()
  )
  const formData = await parseMultipartFormData(request, uploadHandler)
  const imageUrl = formData.get('imageUrl')
  if (!imageUrl) {
    return json({
      errorMsg: 'Something went wrong while uploading'
    })
  }
  return json({
    imageUrl
  })
}

export default function Uploader() {
  const fetcher = useFetcher<ActionData>()
  const submit = useSubmit()
  const [draggingOver, setDraggingOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const dropRef = useRef(null)

  const preventDefaults = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files && event.currentTarget.files[0]) {
      onChange(event.currentTarget.files[0])
    }
  }

  useEffect(() => {
    console.log(fetcher.data)
  }, [fetcher])

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    preventDefaults(e)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onChange(e.dataTransfer.files[0])
      e.dataTransfer.clearData()
    }
  }

  return (
    <>
      <div
        ref={dropRef}
        className={`${
          draggingOver
            ? 'border-rounded border-4 border-dashed border-black border-yellow-300'
            : ''
        } border-rounded group relative flex h-24 w-24 cursor-pointer items-center justify-center rounded-full border-black  transition duration-300 ease-in-out hover:bg-gray-500`}
        style={{
          backgroundSize: 'cover',
          ...(imageUrl ? { backgroundImage: `url(${imageUrl})` } : {})
        }}
        onDragEnter={() => setDraggingOver(true)}
        onDragLeave={() => setDraggingOver(false)}
        onDrag={preventDefaults}
        onDragStart={preventDefaults}
        onDragEnd={preventDefaults}
        onDragOver={preventDefaults}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        {imageUrl && (
          <div className='absolute h-full w-full rounded-full bg-blue-300 opacity-50 transition duration-300 ease-in-out group-hover:opacity-0' />
        )}
        {
          <p className='text- pointer-events-none z-10 cursor-pointer select-none text-4xl font-extrabold transition duration-300 ease-in-out group-hover:opacity-0'>
            +
          </p>
        }
        <input
          id='imageUrl'
          name='imageUrl'
          type='file'
          ref={fileInputRef}
          onChange={handleChange}
          className='hidden'
        />
      </div>
    </>
  )
}
