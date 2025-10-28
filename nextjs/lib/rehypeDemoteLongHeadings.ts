import type { Root, Element, Text, Content } from 'hast'
import { visit } from 'unist-util-visit'

type Options = {
  maxChars?: number
}

function nodeText(node?: Element | Text | null): string {
  if (!node) return ''
  if ((node as Text).type === 'text' && typeof (node as Text).value === 'string') {
    return (node as Text).value
  }
  if ((node as Element).type === 'element' && Array.isArray((node as Element).children)) {
    const children = (node as Element).children as Content[]
    return children.map((child) => nodeText(child as Element | Text)).join('')
  }
  return ''
}

export default function rehypeDemoteLongHeadings(options: Options = {}) {
  const maxChars = options.maxChars ?? 140
  return function transformer(tree: Root) {
    visit<Root, 'element'>(tree, 'element', (node) => {
      const tag = node.tagName
      if (!tag) return
      if (tag === 'h1' || tag === 'h2' || tag === 'h3' || tag === 'h4' || tag === 'h5' || tag === 'h6') {
        const text = nodeText(node as Element)
        if (text && text.trim().length > maxChars) {
          node.tagName = 'p'
          if (node.properties) {
              delete (node.properties as Record<string, unknown>).id
          }
        }
      }
    })
  }
}


