import React, { useRef, useState } from 'react'

interface props {
  onChange: (file: File) => any
  imageUrl?: string
}

export const ImageUploader = ({ onChange, imageUrl }: props) => {
  const [draggingOver, setDraggingOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const dropRef = useRef(null)

  // 1
  const preventDefaults = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  // 2
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    preventDefaults(e)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onChange(e.dataTransfer.files[0])
      e.dataTransfer.clearData()
    }
  }

  // 3
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files && event.currentTarget.files[0]) {
      onChange(event.currentTarget.files[0])
    }
  }

  // 4
  return (
    <div className='flex justify-center'>
      <div
        ref={dropRef}
        className={`${
          draggingOver
            ? 'border-rounded border-yellow-300 border-4 border-dashed'
            : ''
        } bg-gray-400 hover:bg-gray-500 group relative flex h-24 w-24 cursor-pointer items-center justify-center rounded-full transition duration-300 ease-in-out`}
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
          <div className='bg-blue-400 absolute h-full w-full rounded-full opacity-50 transition duration-300 ease-in-out group-hover:opacity-0' />
        )}
        {
          <p className='text-gray-200 pointer-events-none z-10 cursor-pointer select-none text-4xl font-extrabold transition duration-300 ease-in-out group-hover:opacity-0'>
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
    </div>
  )
}
