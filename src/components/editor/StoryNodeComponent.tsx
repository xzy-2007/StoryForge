import { useState } from 'react'
import { Handle, Position, type NodeProps } from 'reactflow'
import { NodeType, NodeTypeLabel, NodeTypeColor, NodeShape } from '../../models/StoryNode'
import { useTheme } from '../../theme/ThemeContext'

interface StoryNodeData {
  title: string
  content: string
  type?: string
}

const shapeStyles: Record<string, React.CSSProperties> = {
  [NodeShape.ROUNDED]: { borderRadius: 8 },
  [NodeShape.PILL]: { borderRadius: 24 },
  [NodeShape.CARD]: { borderRadius: 6, borderLeft: '4px solid', padding: '10px 16px' },
}

const innerShapeStyles: Record<string, React.CSSProperties> = {
  [NodeShape.ROUNDED]: {},
  [NodeShape.PILL]: {},
  [NodeShape.CARD]: {},
}

export function StoryNodeComponent({ data, selected }: NodeProps<StoryNodeData>) {
  const { theme, nodeShape } = useTheme()
  const [expanded, setExpanded] = useState(false)
  const nodeType = (data.type as NodeType) || NodeType.DIALOGUE
  const borderColor = NodeTypeColor[nodeType] || '#4fc3f7'
  const typeLabel = NodeTypeLabel[nodeType] || nodeType
  const shape = nodeShape || NodeShape.ROUNDED

  const outerStyle: React.CSSProperties = {
    background: theme.nodeBg,
    border: `2px solid ${selected ? '#fff' : borderColor}`,
    minWidth: 180,
    color: theme.text,
    fontSize: 13,
    boxShadow: selected ? `0 0 14px ${borderColor}44` : '0 2px 8px rgba(0,0,0,0.4)',
    transition: 'all 0.15s',
    ...shapeStyles[shape],
  }

  if (shape === NodeShape.CARD) {
    outerStyle.borderLeft = `4px solid ${borderColor}`
    outerStyle.padding = '10px 16px'
  } else {
    outerStyle.padding = '10px 16px'
  }

  const innerStyle: React.CSSProperties = innerShapeStyles[shape] || {}

  return (
    <div style={outerStyle}>
      <Handle
        type="target"
        position={Position.Top}
        style={{
          background: borderColor,
          width: 10,
          height: 10,
          border: '2px solid #1e2a3a',
        }}
      />
      <div style={innerStyle}>
        <div style={{ fontSize: 11, color: borderColor, marginBottom: 4, fontWeight: 'bold' }}>
          {typeLabel}
        </div>
        <div style={{ fontWeight: 'bold', fontSize: 14, marginBottom: 4 }}>{data.title}</div>
        {data.content && data.content.length > 100 ? (
          <div>
            <div style={{ color: theme.textSecondary, fontSize: 12 }}>
              {expanded ? data.content : `${data.content.slice(0, 100)}...`}
            </div>
            <button
              onClick={() => setExpanded(!expanded)}
              style={{
                background: 'transparent',
                border: 'none',
                color: borderColor,
                cursor: 'pointer',
                fontSize: 11,
                padding: '2px 0',
                marginTop: 2,
              }}
            >
              {expanded ? '▲ 收起' : '▼ 展开'}
            </button>
          </div>
        ) : (
          data.content && <div style={{ color: theme.textSecondary, fontSize: 12 }}>{data.content}</div>
        )}
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        style={{
          background: borderColor,
          width: 10,
          height: 10,
          border: '2px solid #1e2a3a',
        }}
      />
    </div>
  )
}