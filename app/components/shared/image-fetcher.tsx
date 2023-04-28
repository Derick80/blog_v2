import { useFetcher, useSubmit } from '@remix-run/react'
import React from 'react'
import Button from './button'


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
        onChange={onClick}
        className='flex flex-row items-center gap-2'
      >
        <label htmlFor='imageUrl' className='subtitle'></label>
        <input
          id='imageUrl'
          className='text-slate12 block w-full rounded-xl border-2 p-2 text-sm'
          type='file'
          name='imageUrl'
          accept='image/*'
        />
        <Button variant='primary' className='' type='submit'>
          Upload
        </Button>
      </fetcher.Form>
      {fetcher.data ? (
        <div className='mx-auto flex h-fit w-12 flex-row items-center '>
          <input
            type='hidden'
            name='imageUrl'
            onChange={setUrl(fetcher?.data.imageUrl)}
          />
          {fetcher.data.imageUrl && (
            <img
              src={fetcher?.data?.imageUrl}
              alt={'no'}
              className='h-full w-full object-cover'
            />
          )}
        </div>
      ) : null}
    </>
  )
}
