import { RichTextEditor } from '@mantine/tiptap'
import * as Toolbar from '@radix-ui/react-toolbar'
import Link from '@tiptap/extension-link'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useCallback } from 'react'

const TipTap = () => {
  const editor = useEditor({
    extensions: [
      Link.configure({
        openOnClick: false
      }),
      StarterKit.configure({
        history: false
      })
    ],
    editorProps: {
      attributes: {
        class:
          'flex-1 p-4 bg-crimson12 h-24 mx-auto text-slate1 dark:text-slate12 m-5 focus:outline-none rounded-xl mt-0'
      }
    }
  })
  const setLink = useCallback(() => {
    const previousUrl = editor?.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)

    // cancelled
    if (url === null) {
      return
    }

    // empty
    if (url === '') {
      editor?.chain().focus().extendMarkRange('link').unsetLink().run()

      return
    }

    // update link
    editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }, [editor])

  if (!editor) {
    return null
  }

  return (
    <>
      <RichTextEditor editor={editor}>
        <RichTextEditor.Toolbar sticky stickyOffset={60}

        >
         <div className='flex flex-row items-start'>
         <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
            <RichTextEditor.ClearFormatting />
            <RichTextEditor.Highlight />
            <RichTextEditor.Code />

            <RichTextEditor.Blockquote />
            <RichTextEditor.Hr />


            <RichTextEditor.Link />
            <RichTextEditor.Unlink />

            <RichTextEditor.AlignLeft />
            <RichTextEditor.AlignCenter />
            <RichTextEditor.AlignJustify />
            <RichTextEditor.AlignRight />
          </RichTextEditor.ControlsGroup>
          </div>
        </RichTextEditor.Toolbar>

        <RichTextEditor.Content />
      </RichTextEditor>

      <input type='hidden' name='body' value={editor?.getHTML()} />
    </>
  )
}

export default TipTap
