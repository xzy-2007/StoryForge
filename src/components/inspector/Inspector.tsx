import { useCallback, useState } from 'react'
import type { Node } from 'reactflow'
import type { CSSProperties } from 'react'
import { NodeType, NodeTypeLabel, NodeTypeColor } from '../../models/StoryNode'
import { useTheme } from '../../theme/ThemeContext'

interface InspectorProps {
  selectedNode: Node | null
  onUpdateNode: (nodeId: string, data: Record<string, string>) => void
}

const typeOptions = [
  { value: NodeType.DIALOGUE, label: NodeTypeLabel[NodeType.DIALOGUE] },
  { value: NodeType.CHOICE, label: NodeTypeLabel[NodeType.CHOICE] },
  { value: NodeType.EVENT, label: NodeTypeLabel[NodeType.EVENT] },
  { value: NodeType.CONDITION, label: NodeTypeLabel[NodeType.CONDITION] },
  { value: NodeType.ENDING, label: NodeTypeLabel[NodeType.ENDING] },
  { value: NodeType.NOTE, label: NodeTypeLabel[NodeType.NOTE] },
]

export function Inspector({ selectedNode, onUpdateNode }: InspectorProps) {
  const { theme } = useTheme()
  const [collapsed, setCollapsed] = useState(false)

  const handleTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!selectedNode) return
      onUpdateNode(selectedNode.id, {
        title: e.target.value,
        content: selectedNode.data.content ?? '',
        type: selectedNode.data.type ?? '',
      })
    },
    [selectedNode, onUpdateNode]
  )

  const handleContentChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (!selectedNode) return
      onUpdateNode(selectedNode.id, {
        title: selectedNode.data.title ?? '',
        content: e.target.value,
        type: selectedNode.data.type ?? '',
      })
    },
    [selectedNode, onUpdateNode]
  )

  const handleTypeChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (!selectedNode) return
      onUpdateNode(selectedNode.id, {
        title: selectedNode.data.title ?? '',
        content: selectedNode.data.content ?? '',
        type: e.target.value,
      })
    },
    [selectedNode, onUpdateNode]
  )

  const inputStyle: CSSProperties = {
    width: '100%',
    boxSizing: 'border-box',
    background: theme.inputBg,
    color: theme.text,
    border: `1px solid ${theme.inputBorder}`,
    borderRadius: 4,
    padding: '6px 8px',
    fontSize: 13,
    outline: 'none',
  }

  const panelStyle: CSSProperties = {
    width: collapsed ? 40 : 220,
    minWidth: collapsed ? 40 : 220,
    background: theme.surface,
    color: theme.text,
    borderLeft: `1px solid ${theme.border}`,
    display: 'flex',
    flexDirection: 'column',
    transition: 'width 0.2s',
    overflow: 'hidden',
    position: 'relative',
  }

  const toggleBtnStyle: CSSProperties = {
    background: 'transparent',
    border: 'none',
    color: theme.textSecondary,
    cursor: 'pointer',
    fontSize: 14,
    padding: '8px 6px',
    borderRadius: 4,
    width: '100%',
    textAlign: 'center',
  }

  if (!selectedNode) {
    return (
      <div style={panelStyle}>
        {collapsed ? (
          <button onClick={() => setCollapsed(false)} style={toggleBtnStyle} title="展开面板">
            ◀
          </button>
        ) : (
          <>
            <div style={{ display: 'flex', alignItems: 'center', padding: '8px 8px', borderBottom: `1px solid ${theme.border}` }}>
              <span style={{ fontSize: 13, flex: 1, color: theme.textSecondary }}>属性面板</span>
              <button onClick={() => setCollapsed(true)} style={{ ...toggleBtnStyle, width: 'auto' }} title="折叠面板">
                ▶
              </button>
            </div>
            <div style={{ padding: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, fontSize: 13, color: theme.textSecondary }}>
              ← 点击节点编辑属性
            </div>
          </>
        )}
      </div>
    )
  }

  const currentType = (selectedNode.data.type as NodeType) || NodeType.DIALOGUE
  const typeColor = NodeTypeColor[currentType] || '#4fc3f7'

  return (
    <div style={panelStyle}>
      <div style={{ display: 'flex', alignItems: 'center', padding: '8px 8px', borderBottom: `1px solid ${theme.border}` }}>
        {!collapsed && <span style={{ fontSize: 13, flex: 1, color: theme.textSecondary }}>属性面板</span>}
        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{ ...toggleBtnStyle, width: 'auto' }}
          title={collapsed ? '展开面板' : '折叠面板'}
        >
          {collapsed ? '◀' : '▶'}
        </button>
      </div>
      {!collapsed && (
        <div style={{ padding: '8px 12px', overflowY: 'auto', flex: 1 }}>
          <div style={{ marginBottom: 10 }}>
            <label style={{ display: 'block', fontSize: 11, color: theme.textSecondary, marginBottom: 3 }}>标题</label>
            <input
              data-testid="inspector-title"
              value={selectedNode.data.title ?? ''}
              onChange={handleTitleChange}
              style={inputStyle}
            />
          </div>
          <div style={{ marginBottom: 10 }}>
            <label style={{ display: 'block', fontSize: 11, color: theme.textSecondary, marginBottom: 3 }}>内容</label>
            <textarea
              data-testid="inspector-content"
              value={selectedNode.data.content ?? ''}
              onChange={handleContentChange}
              rows={3}
              style={{ ...inputStyle, resize: 'vertical' }}
            />
          </div>
          <div style={{ marginBottom: 10 }}>
            <label style={{ display: 'block', fontSize: 11, color: theme.textSecondary, marginBottom: 3 }}>类型</label>
            <select
              data-testid="inspector-type-select"
              value={currentType}
              onChange={handleTypeChange}
              style={{ ...inputStyle, cursor: 'pointer' }}
            >
              {typeOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div style={{ fontSize: 10, color: theme.textSecondary, marginTop: 12, opacity: 0.5, wordBreak: 'break-all' }}>
            ID: {selectedNode.id}
          </div>
        </div>
      )}
    </div>
  )
}