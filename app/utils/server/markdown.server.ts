import { parse, RenderableTreeNodes, transform } from '@markdoc/markdoc'

export async function parseMarkdown(
  markdown: string
): Promise<RenderableTreeNodes> {
  return transform(parse(markdown))
}
