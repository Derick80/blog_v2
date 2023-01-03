import React from 'react'
import { useEffect, useRef } from 'react'
import { useQuill } from 'react-quilljs'

type QuillPropTypes = {
  defaultValue?: string
  value?: string
  name: string
}

export default function Quill({ defaultValue, name, value }: QuillPropTypes) {
  const { quill, quillRef } = useQuill()
  const inputRef = React.useRef<HTMLInputElement>(null)

  const handleQuillChange = (event: any) => {
    if (inputRef.current) {
      inputRef.current.value = quill?.root.innerHTML
    }
  }

  useEffect(() => {
    if (quill) {
      if (defaultValue) {
        quill.clipboard.dangerouslyPasteHTML(defaultValue)
      }
      quill.on('text-change', handleQuillChange)
    }
    return () => {
      if (quill) {
        quill.off('text-change', handleQuillChange)
      }
    }
  }, [quill, defaultValue])
  return (
    <div style={{ width: 500, height: 300 }}>
      <input
        ref={inputRef}
        type='hidden'
        name={name}
        value={value}
        defaultValue={defaultValue}
      />
      <div ref={quillRef} />
    </div>
  )
}
