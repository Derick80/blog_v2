import { Button, Flex } from '@mantine/core'
import { RichTextEditor } from '@mantine/tiptap'
import * as Toolbar from '@radix-ui/react-toolbar'
import Link from '@tiptap/extension-link'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useCallback } from 'react'
import Image from '@tiptap/extension-image'
import { ImageIcon } from '@radix-ui/react-icons'

const TipTap = ({ content }: { content?: string }) => {
  const editor = useEditor({
    content,
    extensions: [
Image,
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
          'flex-1 p-4 h-auto mx-auto text-slate12  m-5 focus:outline-none rounded-xl mt-0'
      }
    }
  })
  const addImage = useCallback(() => {
    const url = window.prompt('URL')

    if (url) {
      editor?.chain().focus().setImage({ src: url }).run()
    }
  }, [editor])

  if (!editor) {
    return null
  }

    return (
    <>
      <RichTextEditor editor={editor}>
        <RichTextEditor.Toolbar sticky stickyOffset={60}>
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
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Link />
            <RichTextEditor.Unlink />
          </RichTextEditor.ControlsGroup>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.AlignLeft />
            <RichTextEditor.AlignCenter />
            <RichTextEditor.AlignJustify />
            <RichTextEditor.AlignRight />

          </RichTextEditor.ControlsGroup>
          <RichTextEditor.ControlsGroup>
              <Button type='button'
              size='xs'
              variant='outline'
              onClick={ addImage }>
                <ImageIcon />
              </Button>
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>


        <RichTextEditor.Content />
      </RichTextEditor>

      <input type='hidden' name='body' value={editor?.getHTML()} />
    </>
  )
}


export default TipTap
