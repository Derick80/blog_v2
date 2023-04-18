import { useFetcher } from '@remix-run/react'
import React from 'react'

export default function ImageUploader({ setUrl }: any) {
  const fetcher = useFetcher()
  const onClick = async () =>
    fetcher.submit({
      imageUrl: 'imageUrl',
      key: 'imageUrl',
      action: '/actions/cloudinary'
    })
  return (
    <>
      <fetcher.Form
        method='POST'
        encType='multipart/form-data'
        action='/actions/cloudinary'
        onClick={onClick}
        className='mx-auto flex flex-col items-center gap-2'
      >
        <label htmlFor='imageUrl' className='subtitle'>
          Attach an Image
        </label>
        <input
          id='imageUrl'
          className='block w-full rounded-xl border-2 p-2 text-sm text-slate12'
          type='file'
          name='imageUrl'
          accept='image/*'
        />
        <button className='' type='submit'>
          Upload Image
        </button>
      </fetcher.Form>
      {fetcher.data ? (
        <div className='flex w-full flex-col items-center gap-2'>
          <p className='h6'>Image uploaded</p>
          <input
            type='hidden'
            name='imageUrl'
            value={fetcher?.data?.imageUrl}
            onChange={setUrl(fetcher?.data.imageUrl)}
          />
          <div className='flex'>
            <div className=' rounded-xl  text-slate12'>
              <img
                src={fetcher?.data?.imageUrl}
                alt={'no'}
                style={{
                  objectFit: 'cover'
                }}
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
