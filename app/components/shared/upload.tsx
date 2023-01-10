import { useFetcher } from '@remix-run/react'
import { useRef } from 'react'

// upload component that uses remix's useFetcher hook to upload a file to Cloudinary and then update another form with the new image url commonly used in a profile photo update form and a blog post Form

export type UploadMeProps = {
  onChange: (event: {
    currentTarget:
      | FormData
      | HTMLFormElement
      | HTMLButtonElement
      | HTMLInputElement
      | URLSearchParams
      | { [name: string]: string }
      | null
  }) => any
  // not entirely sure that I need all these types
}
export const UploadMe = ({ onChange }: UploadMeProps) => {
  const fetcher = useFetcher()
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  return (
    <>
      {/* use fetcher for to send the file to the image action resource route for upload */}
      <fetcher.Form
        method='post'
        action='/actions/image'
        encType='multipart/form-data'
        onChange={(event) => {
          onChange(event)
          fetcher.submit(event.currentTarget, { replace: true })
        }}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className='btn-primary btn-sold'>
          Update Photo
          <input
            type='file'
            name='imageUrl'
            id='imageUrl'
            accept='image/*'
            ref={fileInputRef}
            className='hidden'
          />
        </div>
      </fetcher.Form>
    </>
  )
}
