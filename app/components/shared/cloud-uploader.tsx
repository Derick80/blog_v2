import React, { useRef, useState } from 'react'

interface props {
  onChange: (file: File) => any
  img?: string
}

export const CloudUpload = ({ onChange, img }: props) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const dropRef = useRef(null)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files && event.currentTarget.files[0]) {
      onChange(event.currentTarget.files[0])
    }
  }

  // 4
  return (
    <>
      <div
        className={`group relative flex h-24 w-24 cursor-pointer items-center justify-center bg-gray-400 transition duration-300 ease-in-out hover:bg-gray-500`}
        style={{
          backgroundSize: 'cover',
          ...(img ? { backgroundImage: `url(${img})` } : {})
        }}
        onClick={() => fileInputRef.current?.click()}
      >
        {img && (
          <div className='absolute h-full w-full bg-blue-400 opacity-20 transition duration-300 ease-in-out group-hover:opacity-0' />
        )}
        {
          <p className='pointer-events-none z-10 cursor-pointer select-none text-4xl font-extrabold text-gray-200 transition duration-300 ease-in-out group-hover:opacity-0'>
            +
          </p>
        }
        <input
          id='postImg'
          name='postImg'
          type='file'
          ref={fileInputRef}
          onChange={handleChange}
          className='hidden'
        />
      </div>
    </>
  )
}
