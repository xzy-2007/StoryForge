import { useCallback, useRef, useEffect } from 'react'
import { type MouseEvent as ReactMouseEvent } from 'react'
import ReactFlow, {
  Background,
  Controls,
  SelectionMode,
  type Node,
  type Edge,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { StoryNodeComponent } from './StoryNodeComponent'
import { useTheme } from '../../theme/ThemeContext'

export const nodeTypes = {
  storyNode: StoryNodeComponent,
}

export const initialNodes: Node[] = [
  {
    id: 'opening',
    type: 'storyNode',
    position: { x: 150, y: 100 },
    data: {
      title: '开场场景',
      content: '很久很久以前...',
      type: 'DIALOGUE',
    },
  },
  {
    id: 'first-choice',
    type: 'storyNode',
    position: { x: 450, y: 200 },
    data: {
      title: '第一个选择',
      content: '接下来会发生什么？',
      type: 'CHOICE',
    },
  },
]

interface StoryFlowProps {
  nodes: Node[]
  edges: Edge[]
  onNodesChange: any
  onEdgesChange: any
  onConnect: any
  onNodeClick?: (event: ReactMouseEvent, node: Node) => void
  onPaneClick?: () => void
  onNodeContextMenu?: (event: ReactMouseEvent, node: Node) => void
  reactFlowWrapperRef?: React.RefObject<HTMLDivElement | null>
  reactFlowInstance?: any
}

export function StoryFlow({ nodes, edges, onNodesChange, onEdgesChange, onConnect, onNodeClick, onPaneClick, onNodeContextMenu, reactFlowWrapperRef, reactFlowInstance }: StoryFlowProps) {
  const { theme } = useTheme()

  return (
    <div
      data-testid="story-flow"
      ref={reactFlowWrapperRef}
      style={{ width: '100%', height: '100%' }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        onNodeContextMenu={onNodeContextMenu}
        nodeTypes={nodeTypes}
        fitView
        selectionMode={SelectionMode.Partial}
        selectionOnDrag
        panOnDrag={[1, 2]}
        selectNodesOnDrag={false}
        style={{ background: theme.bg }}
      >
        <Background color={theme.border} style={{ opacity: 0.25 }} />
        <Controls style={{ background: theme.surfaceAlt, color: theme.text, border: `1px solid ${theme.border}`, borderRadius: 6 }} />
      </ReactFlow>
    </div>
  )
}