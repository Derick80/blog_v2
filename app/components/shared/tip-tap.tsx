import { RichTextEditor } from '@mantine/tiptap'
import Link from '@tiptap/extension-link'
import { useEditor } from '@tiptap/react'
import Underline from '@tiptap/extension-underline'
import Superscript from '@tiptap/extension-superscript'
import SubScript from '@tiptap/extension-subscript'
import StarterKit from '@tiptap/starter-kit'
import { useCallback } from 'react'
import Image from '@tiptap/extension-image'
import { ImageIcon } from '@radix-ui/react-icons'
import Highlight from '@tiptap/extension-highlight'
import TextAlign from '@tiptap/extension-text-align'
import Button from './button'

const TipTap = ({ content }: { content?: string }) => {
  const editor = useEditor({
    content,
    extensions: [
      Image,
      Underline,
      Superscript,
      SubScript,
      Highlight,
      TextAlign,
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
          'flex-1 p-4 h-auto mx-auto text-slate12 w-full text-sm m-5 focus:outline-none rounded-xl mt-0'
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
            <RichTextEditor.Superscript />
            <RichTextEditor.Subscript />

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
            <Button size='small' variant='outline' onClick={addImage}>
              <ImageIcon />
            </Button>
          </RichTextEditor.ControlsGroup>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.ColorPicker
              colors={[
                '#25262b',
                '#868e96',
                '#fa5252',
                '#e64980',
                '#be4bdb',
                '#7950f2',
                '#4c6ef5',
                '#228be6',
                '#15aabf',
                '#12b886',
                '#40c057',
                '#82c91e',
                '#fab005',
                '#fd7e14'
              ]}
            />
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>

        <RichTextEditor.Content />
      </RichTextEditor>

      <input type='hidden' name='body' value={editor?.getHTML()} />
    </>
  )
}

export default TipTap
