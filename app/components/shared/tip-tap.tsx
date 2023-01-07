import {
  CodeIcon,
  DotFilledIcon,
  FontBoldIcon,
  FontItalicIcon,
  HeadingIcon,
  PilcrowIcon,
  StrikethroughIcon,
  TextAlignCenterIcon
} from '@radix-ui/react-icons'
import * as Toolbar from '@radix-ui/react-toolbar'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

const TipTap = ({ name, content }: { name: string; content: string }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        history: false
      })
    ],
    editorProps: {
      attributes: {
        class:
          'flex-1 prose prose-sm mx-auto sm:prose lg:prose-lg xl:prose-2xl m-5 dark:prose-invert focus:outline-none'
      }
    },
    content: content
  })

  return (
    <div className='w-full space-x-2'>
      {editor && (
        <Toolbar.Root className='flex flex-row' aria-label='Formatting options'>
          <Toolbar.ToggleGroup
            className='flex'
            type='multiple'
            aria-label='Text formatting'
          >
            <Toolbar.ToggleItem
              type='button'
              aria-label='Bold'
              value='bold'
              onClick={() => editor.chain().focus().toggleBold().run()}
              disabled={!editor.can().chain().focus().toggleBold().run()}
            >
              <FontBoldIcon />
            </Toolbar.ToggleItem>
            <Toolbar.ToggleItem
              type='button'
              aria-label='Italic'
              value='italic'
              onClick={() => editor.chain().focus().toggleItalic().run()}
              disabled={!editor.can().chain().focus().toggleItalic().run()}
              className={`flex  items-center ${
                editor.isActive('italic') ? 'is-active' : ''
              }`}
            >
              <FontItalicIcon />
            </Toolbar.ToggleItem>
            <Toolbar.ToggleItem
              type='button'
              aria-label='Strikethrough'
              value='strike'
              onClick={() => editor.chain().focus().toggleStrike().run()}
              disabled={!editor.can().chain().focus().toggleStrike().run()}
              className={`flex  items-center ${
                editor.isActive('strike') ? 'is-active' : ''
              }`}
            >
              <StrikethroughIcon />
            </Toolbar.ToggleItem>
            <Toolbar.ToggleItem
              type='button'
              aria-label='Code'
              value='code'
              onClick={() => editor.chain().focus().toggleCode().run()}
              disabled={!editor.can().chain().focus().toggleCode().run()}
              className={`flex  items-center ${
                editor.isActive('code') ? 'is-active' : ''
              }`}
            >
              <CodeIcon />
            </Toolbar.ToggleItem>
            <Toolbar.ToggleItem
              type='button'
              aria-label='Paragraph'
              value='paragraph'
              onClick={() => editor.chain().focus().setParagraph().run()}
              disabled={!editor.can().chain().focus().setParagraph().run()}
              className={`flex items-center ${
                editor.isActive('paragraph') ? 'is-active' : ''
              }`}
            >
              <PilcrowIcon />
            </Toolbar.ToggleItem>
            <Toolbar.ToggleItem
              type='button'
              aria-label='Heading 1'
              value='heading1'
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
              disabled={
                !editor.can().chain().focus().toggleHeading({ level: 1 }).run()
              }
              className={`flex items-center ${
                editor.isActive('heading', { level: 1 }) ? 'is-active' : ''
              }`}
            >
              <HeadingIcon /> 1
            </Toolbar.ToggleItem>
            <Toolbar.ToggleItem
              type='button'
              aria-label='Heading 2'
              value='heading2'
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
              disabled={
                !editor.can().chain().focus().toggleHeading({ level: 2 }).run()
              }
              className={`flex items-center ${
                editor.isActive('heading', { level: 2 }) ? 'is-active' : ''
              }`}
            >
              <HeadingIcon /> 2
            </Toolbar.ToggleItem>
            <Toolbar.ToggleItem
              type='button'
              aria-label='Heading 3'
              value='heading3'
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 3 }).run()
              }
              disabled={
                !editor.can().chain().focus().toggleHeading({ level: 3 }).run()
              }
              className={`flex items-center ${
                editor.isActive('heading', { level: 3 }) ? 'is-active' : ''
              }`}
            >
              <HeadingIcon /> 3
            </Toolbar.ToggleItem>
            <Toolbar.ToggleItem
              type='button'
              aria-label='Heading 4'
              value='heading4'
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 4 }).run()
              }
              disabled={
                !editor.can().chain().focus().toggleHeading({ level: 4 }).run()
              }
              className={`flex items-center ${
                editor.isActive('heading', { level: 4 }) ? 'is-active' : ''
              }`}
            >
              <HeadingIcon /> 4
            </Toolbar.ToggleItem>
            <Toolbar.ToggleItem
              type='button'
              aria-label='Heading 5'
              value='heading5'
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 5 }).run()
              }
              disabled={
                !editor.can().chain().focus().toggleHeading({ level: 5 }).run()
              }
              className={`flex items-center ${
                editor.isActive('heading', { level: 5 }) ? 'is-active' : ''
              }`}
            >
              <HeadingIcon /> 5
            </Toolbar.ToggleItem>
            <Toolbar.ToggleItem
              type='button'
              aria-label='Heading 6'
              value='heading6'
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 6 }).run()
              }
              disabled={
                !editor.can().chain().focus().toggleHeading({ level: 6 }).run()
              }
              className={`flex items-center ${
                editor.isActive('heading', { level: 6 }) ? 'is-active' : ''
              }`}
            >
              <HeadingIcon /> <p>6</p>
            </Toolbar.ToggleItem>
          </Toolbar.ToggleGroup>

          <div className='flex space-x-2 px-2'></div>
        </Toolbar.Root>
      )}
      <div className='bg-white h-80 overflow-auto rounded-md'>
        <EditorContent editor={editor} className='outline-none' />
      </div>
      <input type='hidden' name={name} value={editor?.getHTML()} />
    </div>
  )
}

export default TipTap
