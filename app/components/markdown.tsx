import { RenderableTreeNodes, renderers } from '@markdoc/markdoc'
import * as React from 'react'

type Props = {
  content: RenderableTreeNodes
}

export default function Markdown({ content }: Props) {
  return <>{renderers.react(content, React)}</>
}
