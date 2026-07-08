import { useCallback, useEffect, useRef } from 'react'
import type { Node } from 'reactflow'
import { NodeType, NodeTypeLabel } from '../../models/StoryNode'

interface ContextMenuState {
  visible: boolean
  x: number
  y: number
  node: Node | null
}

interface ContextMenuProps {
  menu: ContextMenuState
  onClose: () => void
  onDeleteNode: (nodeId: string) => void
  onDuplicateNode: (node: Node) => void
  onChangeNodeType: (nodeId: string, type: NodeType) => void
}

const actions: { label: string; types?: NodeType[] }[] = [
  { label: '对话', types: [NodeType.DIALOGUE] },
  { label: '选择', types: [NodeType.CHOICE] },
  { label: '事件', types: [NodeType.EVENT] },
  { label: '条件', types: [NodeType.CONDITION] },
  { label: '结局', types: [NodeType.ENDING] },
  { label: '备注', types: [NodeType.NOTE] },
]

export function ContextMenu({ menu, onClose, onDeleteNode, onDuplicateNode, onChangeNodeType }: ContextMenuProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!menu.visible) return
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [menu.visible, onClose])

  useEffect(() => {
    if (!menu.visible) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [menu.visible, onClose])

  if (!menu.visible || !menu.node) return null

  const node = menu.node
  const currentType = node.data.type as NodeType

  return (
    <div
      ref={ref}
      style={{
        position: 'fixed',
        left: menu.x,
        top: menu.y,
        background: '#1e2a3a',
        border: '1px solid #0f3460',
        borderRadius: 6,
        padding: '4px 0',
        minWidth: 160,
        zIndex: 9999,
        boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
        fontSize: 13,
        color: '#eee',
      }}
    >
      <div style={{ padding: '6px 12px', fontSize: 11, color: '#888', borderBottom: '1px solid #0f3460' }}>
        {node.data.title || '节点'}
      </div>

      <div style={{ padding: '4px 0', borderBottom: '1px solid #0f3460' }}>
        <div style={{ padding: '4px 12px', fontSize: 11, color: '#888' }}>切换类型</div>
        {actions.map((a) => {
          const type = a.types![0]
          const isActive = currentType === type
          return (
            <div
              key={type}
              onClick={() => {
                onChangeNodeType(node.id, type)
                onClose()
              }}
              style={{
                padding: '4px 12px 4px 20px',
                cursor: 'pointer',
                background: isActive ? '#0f3460' : 'transparent',
                color: isActive ? '#fff' : '#ccc',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#0f3460' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = isActive ? '#0f3460' : 'transparent' }}
            >
              {NodeTypeLabel[type]}
            </div>
          )
        })}
      </div>

      <div
        onClick={() => { onDuplicateNode(node); onClose() }}
        style={{ padding: '6px 12px', cursor: 'pointer' }}
        onMouseEnter={(e) => { e.currentTarget.style.background = '#0f3460' }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
      >
        📋 复制节点
      </div>

      <div
        onClick={() => { onDeleteNode(node.id); onClose() }}
        style={{ padding: '6px 12px', cursor: 'pointer', color: '#ef5350' }}
        onMouseEnter={(e) => { e.currentTarget.style.background = '#0f3460' }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
      >
        🗑️ 删除节点
      </div>
    </div>
  )
}

export type { ContextMenuState }

export function createContextMenuState(): ContextMenuState {
  return { visible: false, x: 0, y: 0, node: null }
}