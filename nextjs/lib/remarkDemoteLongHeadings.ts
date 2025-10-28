import type { Root, Content, Text, Paragraph, Heading } from 'mdast'
import { visit } from 'unist-util-visit'

type Options = { maxChars?: number }

function mdText(node?: Content | Text | Paragraph | null): string {
  if (!node) return ''
  const n = node as Paragraph
  if (n.type === 'paragraph' && Array.isArray(n.children)) return (n.children as Array<Content | Text>).map(mdText).join('')
  return ''
}

export default function remarkDemoteLongHeadings(options: Options = {}) {
  const maxChars = options.maxChars ?? 140
  return function transformer(tree: Root) {
    visit<Root, 'heading'>(tree, 'heading', (node, index, parent) => {
      if (index == null || !parent) return
      const text = mdText(node as Heading)
      if (text.trim().length > maxChars) {
        const para: Paragraph = { type: 'paragraph', children: node.children as Paragraph['children'] }
        parent.children.splice(index, 1, para)
      }
    })
  }
}


