import type { Node, Edge } from 'reactflow'
import { NodeType, NodeTypeLabel } from '../models/StoryNode'

export function exportToPng(element: HTMLElement | null): Promise<void> {
  return import('html-to-image').then(({ toPng }) => {
    if (!element) throw new Error('Canvas element not found')

    const viewport = element.querySelector('.react-flow__viewport') as HTMLElement
    const target = viewport || element

    return toPng(target, {
      backgroundColor: '#0d1321',
      pixelRatio: 3,
      width: target.scrollWidth,
      height: target.scrollHeight,
      style: {
        margin: 0,
        padding: 0,
      },
    }).then((dataUrl) => {
      const link = document.createElement('a')
      link.download = `storyforge-${Date.now()}.png`
      link.href = dataUrl
      link.click()
    })
  })
}

export function exportToMarkdown(nodes: Node[], edges: Edge[]): string {
  const lines: string[] = []
  lines.push('# StoryForge 故事导出')
  lines.push(`> 导出时间: ${new Date().toLocaleString('zh-CN')}`)
  lines.push('')
  lines.push('---')
  lines.push('')

  const nodeMap = new Map(nodes.map((n) => [n.id, n]))

  lines.push('## 节点列表')
  lines.push('')

  for (const node of nodes) {
    const type = node.data.type as string
    const typeLabel = type && NodeTypeLabel[type as NodeType]
      ? NodeTypeLabel[type as NodeType]
      : type ?? '未知'
    lines.push(`### ${node.data.title ?? '未命名'}`)
    lines.push(`- **ID**: \`${node.id}\``)
    lines.push(`- **类型**: ${typeLabel}`)
    if (node.data.content) {
      lines.push(`- **内容**: ${node.data.content}`)
    }
    lines.push('')
  }

  lines.push('## 连接关系')
  lines.push('')

  if (edges.length === 0) {
    lines.push('_暂无连接_')
    lines.push('')
  } else {
    for (const edge of edges) {
      const source = nodeMap.get(edge.source)
      const target = nodeMap.get(edge.target)
      const sourceName = source?.data?.title ?? edge.source
      const targetName = target?.data?.title ?? edge.target
      lines.push(`- \`${sourceName}\` → \`${targetName}\``)
    }
    lines.push('')
  }

  lines.push('---')
  lines.push(`_由 StoryForge 生成_`)

  return lines.join('\n')
}

export function downloadMarkdown(content: string): void {
  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.download = `storyforge-${Date.now()}.md`
  link.href = url
  link.click()
  URL.revokeObjectURL(url)
}